const express = require('express');
const app = express();

const request = require('request');
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/music/1.mp3');
})

app.listen(port, () => {
    console.log("Running !")
})