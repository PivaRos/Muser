const { request } = require('express');
const express = require('express');
const router = express.Router();

const Data = require('../modules/data');
const database = new Data('database.mdb');

const { ObjectId } = require('mongodb');
const mongoModule = require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

router.post('/track', async (req, res) => {
    try{
        let data = await mongoDatabase.addTrack(req.body.track);
        if (data.acknowledged)
        {
            return res.sendStatus(200);
        }
        else
        {
            return res.sendStatus(500);
        }
    }
    catch{
        return res.sendStatus(500);
    }

console.log(data);
return res.sendStatus(200);
});

module.exports = router;