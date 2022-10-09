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



module.exports = router;