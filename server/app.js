const express = require('express');
const app = express();

const request = require('request');
const port = 5000;

app.get('/', (req, res) => {
    res.send("its test");
})

app.listen(port, () => {
    console.log("Running !")
})