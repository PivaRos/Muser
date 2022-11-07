const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const router = express.Router();

const mongoModule = require("./../modules/mongoModule");
const mongoDatabase = new mongoModule(process.env.mongoString);
// Mongo URI
const mongoURI = process.env.mongoString;

// Create mongo connection
const conn = mongoose.createConnection(process.env.trackData, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Init gfs
let gfs, gfsIcons;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfsIcons = Grid(conn.db, mongoose.mongo);
  gfsIcons.collection("uploadsIcons");
  gfs.collection('uploads');
  console.log("connected");
});

const storageIcon = new GridFsStorage({
  url: process.env.trackData,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploadsIcons'
        };
        resolve(fileInfo);
      });
    });
  },
  db:conn
});
const storage = new GridFsStorage({
  url: process.env.trackData,
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
  db:conn
});
const upload = new multer({ storage });
const uploadIcon = new multer({ storageIcon });






const UserAuthorization = async (req, res, next) => {
  //res.locals.user = await mongoDatabase.users.findOne(ObjectId(req.body.sessionid));
  res.locals.user = await mongoDatabase.users.findOne({sessionid:req.headers.authorization});
  if(res.locals.user)
  {
      next();
  }
  else
  {
      return res.sendStatus(401);
  }
}




// @route POST /upload
// @desc  Uploads file to DB
router.post('/track', upload.fields([{name:"track",maxCount:1}, {name:"icon", maxCount:1}]), async (req, res) => {
  
  if (true) // validation
  {
   await mongoDatabase.addTrack({
      name:req.body.name,
      author:JSON.parse(req.body.author),
      src:req.files.track[0].filename,
      icon:req.files.icon[0].filename
    });
    return res.sendStatus(200);
  }
});

 router.delete('/user-avatar', UserAuthorization, async (req, res) => {

 });

router.post('/user-avatar', UserAuthorization, upload.single("avatar"), async (req, res) => {
  if (req.file)
  {
    try{
    if (!res.locals.user.avatar) // if no avatar before
    {
        await mongoDatabase.updateUserIcon(req.headers.authorization, req.file.filename);
        return res.sendStatus(200);
    }
   else if (res.locals.user.avatar) // if user already had avatar
   {
      //delete previus avatar
      gfs.remove({ filename: res.locals.user.avatar, root: 'uploads' }, (err, gridStore) => {});
      // save the new one
      await mongoDatabase.updateUserIcon(req.headers.authorization, req.file.filename);
      return res.sendStatus(200);
   }
  }
  catch(err){
    gfs.remove({ filename: req.file.filename, root: 'uploads' }, (err, gridStore) => {});
    return res.sendStatus(500);
  }
  }
});




// @route GET /image/:filename
// @desc Display Image
router.get('/file/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    const readstream = gfs.createReadStream(file._id);
    readstream.pipe(res);

  });
});


router.get('/track/icon/:filename', (req, res) => {
  gfsIcons.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    const readstream = gfsIcons.createReadStream(file._id);
    readstream.pipe(res);

  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
  if (req.body.secretID === "secretIDmyid123")
  {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.sendStatus(200);
  });
}
else
{
  return res.sendStatus(500); 
}

});

module.exports = router;