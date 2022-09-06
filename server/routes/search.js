const { request } = require('express');
const express = require('express');
const router = express.Router();


const { ObjectId } = require('mongodb');
const mongoModule = require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

const Data = require('../modules/data');
const database = new Data('database.mdb');

router.get('/:query', async (req, res) => {
    if (true) // QUERY VALIDATION
    {
        try{
       const data = await mongoDatabase.MuserSearch(req.params.query)
       if (Object.keys(data).length > 0)
       {
        return res.json({
            error:false,
            authors:[{}],
            tracks:data
        });
       }
       else
       {
        return res.json({
            error: true,
            authors:[{}],
            tracks:[{}]
        });
       }
    }
    catch
    {
        return res.json({
            error: true,
            authors:[{}],
            tracks:[{}]
        });
    }
    }
}); 



module.exports = router;