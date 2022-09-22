const { request } = require('express');
const express = require('express');
const router = express.Router();

const Data = require('../modules/data');
const database = new Data('database.mdb');

const { ObjectId } = require('mongodb');
const mongoModule = require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

router.post('/track', async (req, res) => {
mongoDatabase.addTrack(req.body.track).then(data => {
    console.log(data + "Added !");
})
return res.sendStatus(200);
});

module.exports = router;