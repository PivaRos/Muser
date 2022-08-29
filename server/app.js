const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session')
const fs = require('fs');
var cors = require('cors');

const Data = require('./modules/data');
const database = new Data('database.mdb');

const request = require('request');
const port = 5000;

const upload  = require('express-fileupload');


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
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

  app.use(express.json({
    type: ['application/json', 'text/plain']
  }))


const backdoor = require('./routes/backdoor');
const search = require('./routes/search');
const data = require('./modules/data');
app.use("/backdoor", backdoor);
app.use("/search", search);

app.get("/sss", (req, res) => {
   //database.Execute(`INSERT INTO tracks (src, name, author, icon, likes) VALUES ('thdlplaoekrt.mp3', 'ילדה ירושלמית', 'עדי אגאי', 'ppnmaeoi24.jpg', 0)`)
    res.sendStatus(200);
});

app.post("/track/exclude", async (req, res) => {
    if (req.body.exclude)
    {
        let queryString = `${req.body.exclude[0].ID}`;
    for (let i = 1; i < req.body.exclude.length ; i ++)
    {
        queryString += `, ${req.body.exclude[i].ID}`;
    }
    try{
        const tracks = await database.Query(`SELECT * FROM tracks WHERE ID NOT IN (${queryString}) ORDER BY Rnd(INT(NOW*id)-NOW*id)`);
        return res.json(tracks[0]);
    }catch(err){
        return res.sendStatus(err);
    }
    }
    else{
        try{
            const tracks = await database.Query(`SELECT * FROM tracks ORDER BY Rnd(INT(NOW*id)-NOW*id)`);
        return res.json(tracks[0]);
        }
        catch{
            return res.sendStatus(500);
        }
    }

});


app.get('/', async (req, res) => {
    try{
     const tracks = await database.Query(`SELECT * FROM tracks ORDER BY Rnd(INT(NOW*id)-NOW*id)`); 
     if(tracks)
     {
       const track = tracks;
       return res.json(track);
     }  
     else
     {
        return res.send("not doubd");
     }
    }catch (err){
        return res.status(500).send(err);
    }

    
    res.sendFile(__dirname + `/music/${randomMusic()}`, {acceptRanges: false});
});



app.get('/song', async (req, res) => {
    try{
     const tracks = await database.Query(`SELECT * FROM tracks ORDER BY Rnd(INT(NOW*id)-NOW*id)`); 
     if(tracks)
     {
       const track = tracks[0]
       return res.json(track);
     }  
     else
     {
        return res.send("not doubd");
     }
    }catch (err){
        return res.status(500).send(err);
    }

    
    res.sendFile(__dirname + `/music/${randomMusic()}`, {acceptRanges: false});
});





app.listen(port, () => {
    console.log("Running !");
});

function randomMusic() {
    const files = fs.readdirSync(__dirname + `/music/`);
    const chosenFile = files[Math.floor(Math.random() * files.length)];
    return `${chosenFile}`;
}
  