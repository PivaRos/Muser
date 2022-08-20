const express = require('express');
const app = express();
const session = require('express-session')
const fs = require('fs');
var cors = require('cors');

const Data = require('./modules/data');
const database = new Data('database.mdb');

const request = require('request');
const port = 5000;

const oneDay = 1000 * 60 * 60 * 24;
app.use(cors());
app.use(express.static('public'));
app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));




app.get('/', async (req, res) => {
    try{
     const tracks = await database.Query(`SELECT * FROM tracks ORDER BY Rnd(INT(NOW*id)-NOW*id)`); 
     if(tracks)
     {
       const track = tracks[0]
       return res.json(track);
     }  
     else
     {
        return res.send("not doubd");
     }
    }catch (err){
        return res.status(500).send(err);
    }

    
    res.sendFile(__dirname + `/music/${randomMusic()}`, {acceptRanges: false});
    req.session.cookie
});

app.listen(port, () => {
    console.log("Running !");
});

function randomMusic() {
    const files = fs.readdirSync(__dirname + `/music/`);
    const chosenFile = files[Math.floor(Math.random() * files.length)];
    return `${chosenFile}`;
}
  