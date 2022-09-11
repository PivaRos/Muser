const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session')
const fs = require('fs');
var cors = require('cors');

const request = require('request');
const port = 5000;

require('dotenv').config();



const upload = require('express-fileupload');

const { ObjectId } = require('mongodb');
const mongoModule = require('./modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);



app.set("view engine", "jade");
app.engine("jade", require("jade").__express);

const oneDay = 1000 * 60 * 60 * 24;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(upload());
app.use(express.static('public'));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json({
    type: ['application/json', 'text/plain']
}))

const author = require('./routes/author');
const backdoor = require('./routes/backdoor');
const search = require('./routes/search');
app.use("/backdoor", backdoor);
app.use("/search", search);
app.use("/author", author)

app.get("/sss", (req, res) => {
    //database.Execute(`INSERT INTO tracks (src, name, author, icon, likes) VALUES ('thdlplaoekrt.mp3', 'ילדה ירושלמית', 'עדי אגאי', 'ppnmaeoi24.jpg', 0)`)
    res.sendStatus(200);
});

app.post("/track/exclude", async (req, res) => {
    if (req.body.exclude) {
        try {
            return res.json( await mongoDatabase.getRandomTrackExclude(req.body.exclude));
        } catch (err) {
            return res.sendStatus(500);
        }
    }
    else {
        try {
          return res.json( await mongoDatabase.getRandomTrack());
        }
        catch {
            return res.sendStatus(500);
        }
    }

});


app.get('/track/list', async (req, res) => {
    try {
        return res.json(await mongoDatabase.getRandomTrackList(9));
    } catch (err) {
        return res.status(500);
    }
});


app.get('/track', async (req, res) => {
    try {
        return res.json(await mongoDatabase.getRandomTrack());
    } catch {
        return res.sendStatus(500);
    }
});





app.listen(port, () => {
    console.log("Running !");
});
