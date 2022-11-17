const { request, json } = require('express');
const express = require('express');
const router = express.Router();

var nodemailer = require('nodemailer');




const { ObjectId } = require('mongodb');
const mongoModule =  require('../modules/mongoModule.js');
const { route } = require('./backdoor.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

let Clients = [];



router.get("/init/:sessionid", async (req, res) => {
     const data = await mongoDatabase.users.findOne({sessionid:req.params.sessionid})
      if (data._id)
      {
        Clients.push({
            ClientID : data._id,
            res
        });
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive'
          });
        res.flushHeaders();
        req.on('close', () => {
            Clients = Clients.filter(client => client.id !== data._id);
            return
          });
        }
        else
        {
        return res.sendStatus(403);
        }
});


router.get("/test", (req, res) => {
    Clients.map(client => {
        responseJson  = {
            message :"hello with sse !"
        }
        client.res.write(JSON.stringify(responseJson));
        
    })
})


module.exports = router;