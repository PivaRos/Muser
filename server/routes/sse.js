const { request, json } = require('express');
const express = require('express');
const router = express.Router();

var nodemailer = require('nodemailer');




const { ObjectId } = require('mongodb');
const mongoModule =  require('../modules/mongoModule.js');
const { route } = require('./backdoor.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

router.Clients = [];

const validation = (req, res, next) => {
    //validation here !
    next();
}

router.get("/init/:sessionid", validation, async (req, res) => {
    const data = await (await mongoDatabase.users.findOneAndUpdate({sessionid:req.params.sessionid}, { $set:{online:true}})).value
    console.log(data);
    if (data && data._id)
      {
        router.Clients.push({
            _id: data._id,
            event: res
        });
        res.set({
            'Cache-Control': 'no-cache',
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive'
          });
        res.flushHeaders();
        req.on('close', async () => {
        await mongoDatabase.users.findOneAndUpdate({_id:data._id}, { $set:{online:false}})
        router.Clients = router.Clients.filter(client => client._id !== data._id);
            return
          });
        }
        else
        {
        return res.sendStatus(405);
        }
});


router.get("/test", (req, res) => {
    router.Clients.map(client => {
        responseJson  = {
            message :"hello with sse !"
        }
        client.res.write(JSON.stringify(responseJson));
        
    })
})


module.exports = router;