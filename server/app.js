const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const session = require('express-session')
const fs = require('fs');
var cors = require('cors');
const multer = require('multer');

const request = require('request');
const port = 5000;

require('dotenv').config();

const crypto = require('crypto');
const path = require('path');
const {GridFsStorage} = require('multer-gridfs-storage');

const cookieParser = require("cookie-parser");

const { ObjectId } = require('mongodb');
const mongoModule = require('./modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);



app.set("view engine", "jade");
app.engine("jade", require("jade").__express);

const oneDay = 1000 * 60 * 60 * 24;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors());
app.use(express.static('public'));

app.use(express.json({
    type: ['application/json', 'text/plain']
}))



const storage = new GridFsStorage({
    url: process.env.MongoString,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    },
    db:mongoDatabase.MuserDB
  });

  const upload = multer({ storage });

  app.use(cookieParser());

const author = require('./routes/author');
const backdoor = require('./routes/backdoor');
const search = require('./routes/search');
const user = require('./routes/user');
const { env } = require('process');
app.use("/backdoor", backdoor);
app.use("/search", search);
app.use("/author", author)
app.use("/user", user);

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



app.post('/upload', upload.single('file'), (req, res) => {
    return res.sendStatus(200);
});

const Grid = require('gridfs-stream');
let gfs = Grid(mongoDatabase.MuserDB, mongoDatabase.Client);
gfs.collection('uploads');

app.get('/test/:trackname', async (req, res) => {
   await gfs.files.findOne({filename:req.params.trackname}, (err, file) => {
    if (!err)
    {
        try{
            var readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);

        }catch(err){
            return res.status(500).send({message:err.message});
        }
    }
   
   });
});



app.listen(port, () => {
    console.log("Running !");
});
