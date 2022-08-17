const express = require('express');
const app = express();
const fs = require('fs');

const request = require('request');
const port = 5000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + `/music/${randomMusic()}`, {acceptRanges: false});
});

app.listen(port, () => {
    console.log("Running !");
});

function randomMusic() {
    const files = fs.readdirSync(__dirname + `/music/`);
    const chosenFile = files[Math.floor(Math.random() * files.length)];
    return `${chosenFile}`;
}
  