const { request } = require('express');
const express = require('express');
const router = express.Router();


const { ObjectId } = require('mongodb');
const mongoModule = require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

router.get('/:query', async (req, res) => {
    if (true) // QUERY VALIDATION
    {
        try{
        const resObject = {
            error:false,
            authors:[],
            tracks:[]
        }
       const data = await mongoDatabase.MuserSearch(req.params.query);
       if (Object.keys(data.tracks).length > 0)
       {
        resObject.tracks = data.tracks;
       }
       if(Object.keys(data.authors).length > 0)
       {
        resObject.authors = data.authors;
       }
       if (Object.keys(data.tracks).length === 0 && Object.keys(data.authors).length === 0)
       {
        resObject.error = true;
       }
       return res.json(resObject);
    }
    catch
    {
        return res.json({error: true, authors:[], tracks:[]});
    }
    }
}); 



module.exports = router;