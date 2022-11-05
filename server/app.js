const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const multer = require('multer');
const methodOverride = require('method-override');


const port = 5000;

require('dotenv').config();

const cookieParser = require("cookie-parser");

const { ObjectId } = require('mongodb');
const mongoModule = require('./modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);


app.use(methodOverride('_method'));
app.engine("jade", require("jade").__express);

app.use(bodyParser.json());
app.set('view engine', 'ejs');

const oneDay = 1000 * 60 * 60 * 24;
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(express.static('public'));

app.use(express.json({
    type: ['application/json', 'text/plain']
}))



// const storage = new GridFsStorage({
//     url: process.env.MongoString,
//     file: (req, file) => {
//       return new Promise((resolve, reject) => {
//         crypto.randomBytes(16, (err, buf) => {
//           if (err) {
//             return reject(err);
//           }
//           const filename = buf.toString('hex') + path.extname(file.originalname);
//           const fileInfo = {
//             filename: filename,
//             bucketName: 'uploads'
//           };
//           resolve(fileInfo);
//         });
//       });
//     },
//     db:mongoDatabase.MuserDB
//   });

//   const upload = multer({ storage });

  app.use(cookieParser());

const author = require('./routes/author');
const backdoor = require('./routes/backdoor');
const search = require('./routes/search');
const user = require('./routes/user');
const upload = require('./routes/upload');
const test = require('./routes/test');

const { env } = require('process');
app.use("/search", search);
app.use("/author", author)
app.use("/user", user);
app.use("/backdoor", backdoor);
app.use("/upload", upload);
app.use("/test", test);


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
        return res.json(await mongoDatabase.getRandomTrackList(30));
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




app.post('/upload', (req, res) => {
    return res.sendStatus(200);
});

app.post('/track/listById', async (req, res) => {
    try{
        return res.json( await (await mongoDatabase.getTracksListById(req.body.tracks)).toArray());
    }
    catch(err){
        return res.status(500).json({message:err.message});
    }
    
});



app.listen(port, () => {
    console.log("Running !");
});
