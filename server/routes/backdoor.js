const { request } = require('express');
const express = require('express');
const router = express.Router();

const Data = require('../modules/data');
const database = new Data('database.mdb');



router.post('/track', async (req, res) => {
    console.log(req.files);

    // NEED TO ADD Validation
    //database.Execute(`INSERT INTO tracks (name, author, src, icon, likes) VALUES ('${req.body.name}', '${req.body.author}', '${req.body.icon}', '${req.body,src}', 0) ;`)
});

module.exports = router;