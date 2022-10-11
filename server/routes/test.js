const { request } = require('express');
const express = require('express');
const router = express.Router();

var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SmtpDataUserName,
        pass: process.env.SmtpDataPassword
    }
});




const { ObjectId } = require('mongodb');
const mongoModule =  require('../modules/mongoModule.js');
const mongoDatabase = new mongoModule(process.env.MongoString);

const registerOnAction = mongoDatabase.OnActionDB.collection("register");

const UserAuthorization = async (req, res, next) => {
    //res.locals.user = await mongoDatabase.users.findOne(ObjectId(req.body.sessionid));
    res.locals.user = await mongoDatabase.users.findOne({sessionid:req.headers.authorization});
    if(res.locals.user)
    {
        next();
    }
    else
    {
        return res.sendStatus(401);
    }
}






function randomCodeGenerator(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function randomSessionGenerator(length) {
    var result = '';
    var characters = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


module.exports = router;