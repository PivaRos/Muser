const { request } = require('express');
const express = require('express');
const router = express.Router();


const { ObjectId } = require('mongodb');
const mongoModule = require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

router.get("/:author", async (req, res) => {
    if (true) //validate param
    {
      return res.json(await mongoDatabase.getAuthor(req.params.author));
    }
});




module.exports = router;