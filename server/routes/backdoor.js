const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const router = express.Router();

const mongoModule = require("./../modules/mongoModule");
const mongoDatabase = new mongoModule(process.env.mongoString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
// Mongo URI
const mongoURI = process.env.mongoString;

// Create mongo connection
const conn = mongoose.createConnection(process.env.trackData, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// Init gfs
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log("opened");
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
const upload = multer({ storage });



// @route POST /upload
// @desc  Uploads file to DB
router.post('/track',upload.single("track") , (req, res) => {
  res.json({ file: req.file });
});

// @route GET /files
// @desc  Display all files in JSON
router.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /image/:filename
// @desc Display Image
router.get('/track/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    const readstream = gfs.createReadStream(file._id);
    readstream.pipe(res);

  });
});

// @route DELETE /files/:id
// @desc  Delete file
router.delete('/files/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    res.sendStatus(200);
  });
});

module.exports = router;