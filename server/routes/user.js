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


router.post("/" ,async (req, res) => {
    if (true) // validation 
    {   
        const sessionID = randomSessionGenerator(18);
        const user = await mongoDatabase.users.findOneAndUpdate({ $and: [{ username: req.body.username }, { password: req.body.password }] }, {$set:{sessionid:sessionID}});
        if (user.value) {
            return res.json({sessionid:sessionID});
        }
        else {
            return res.sendStatus(401);
        }
    }
});

router.post("/register/1", async (req, res) => {
    const user = await mongoDatabase.users.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (!user) //validation
    {
        const code = randomCodeGenerator(6);
        const sessionID = randomSessionGenerator(16);
        const response = await registerOnAction.insertOne({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            code: code,
            lastSendCode: Date.now(),
            actionid:sessionID
        });

        let SignupMailOptions = {
            from: process.env.SmtpDataUserName,
            to: req.body.email,
            subject: "Signup To Muser !",
            text: code,
            html: `
            <body style="color:black;">
            <h1 style="color:black;">Hey, Here is your Code: ${code}</h1>
            </body>
            `
        }
        try {
            await transporter.sendMail(SignupMailOptions);

            return res.json({actionid:sessionID});
        }
        catch
        {
            return res.sendStatus(500)
        }
    }
    else {
        return res.status(406).send("user already exist");
    }

});

router.delete("/register", async (req, res) => {
    if (true)// validation
    {

       const response = await registerOnAction.findOneAndDelete({actionid:req.headers.authorization});
       if (response.ok)
       {
        return res.sendStatus(200);
       }
       else
       {
        return res.sendStatus(500);
       }
    }
});

router.post("/register/2", async (req, res) => {
    if (true)// validation
    {
        const Action = await registerOnAction.findOne({actionid : req.headers.authorization});
        if (Action._id) {
            if (Action.code === req.body.code) {
                const response = await mongoDatabase.users.insertOne({
                    username: Action.username,
                    password: Action.password,
                    email: Action.email,
                    sessionid:Action.actionid
                });
                registerOnAction.deleteMany({ $or: [{ username: Action.username }, { email: Action.email }] });
                return res.json({sessionid:actionid});

            }
            else {
                return res.status(406).send("code does not match");
            }
        }

        else {
            return res.status(404).send("no action found");
        }
    }
});


router.post("/register/resend", async (req, res) => {
    if (true)// validation for req.body components
    {
        const getRegisterAction = await registerOnAction.findOne({actionid:req.headers.authorization});
        const lastsend = new Date(getRegisterAction.lastSendCode);
        const diffMins = Math.round((((new Date() - lastsend) % 86400000) % 3600000) / 60000);
        if (diffMins >= 2) {
            //resend code
            const code = randomCodeGenerator(6);
            let mailOptions = {
                from: process.env.SmtpDataUserName,
                to: getRegisterAction.email,
                subject: "Signup To Muser !",
                text: code,
                html: `
                <body style="color:black;">
                <h1 style="color:black;">Hey, Here is your Code: ${code}</h1>
                </body>
                `
            }
            try {
                await registerOnAction.updateOne({ actionid: req.headers.authorization }, { $set: { code: code, lastSendCode: Date.now() } });
                await transporter.sendMail(mailOptions);
                return res.sendStatus(200);
            }
            catch (err) {
                return res.status(500).send(err);
            }
        }
        else {
            return res.status(401).json({ 
                message:"code was already sent, please wait at least 2 minutes before requesting new one",
                lastsend:getRegisterAction.lastSendCode
            });
        }
    }
});


router.put("/track/like", UserAuthorization, async (req, res) => {
    if(true) // validation
    {
        try{
            if (!res.locals.user.likedtracks.includes(req.body.trackid))
            {
                const result = await mongoDatabase.tracks.findOneAndUpdate({ _id: ObjectId(req.body.trackid) }, {$inc: { likes: 1 }});
                if (result)
                {
                        await mongoDatabase.users.updateOne({_id:ObjectId(res.locals.user._id)}, { $push: { likedtracks: req.body.trackid } });
                        return res.sendStatus(200);
                }
            }
            return res.sendStatus(400);
        }
        catch{
            return res.sendStatus(500);
        }

    }
});

router.put("/track/unlike", UserAuthorization, async (req, res) => {
    if(true) // validation
    {
        try{
            if(res.locals.user.likedtracks.includes(req.body.trackid))
            {
                const result = await mongoDatabase.tracks.findOneAndUpdate({ _id: ObjectId(req.body.trackid) }, {$inc: { likes: -1 }});
                if (result)
                {
                    await mongoDatabase.users.updateOne({_id:ObjectId(res.locals.user._id)}, { $pull: { likedtracks: req.body.trackid } });
                    return res.sendStatus(200);
                }
            }
            return res.sendStatus(400);
        }
        catch{
            return res.sendStatus(500);
        }

    }
});

router.get("/private", async (req, res) => {
    res.locals.user = await mongoDatabase.users.findOne({sessionid:req.headers.authorization}, {projection:{sessionid:0, password:0}});
    if(res.locals.user)
    {
        return res.json(res.locals.user);   
    }
    else
    {
        return res.sendStatus(401);
    }
});

router.get("/public", async (req, res) => {
    if (true) // validation
    {
        res.locals.user = await mongoDatabase.users.findOne( { _id : ObjectId(req.body._id) }, {projection:{ password:0 , sessionid:0 , email:0, _id:0} });
       console.log(res.locals.user);
        if (res.locals.user)
        {
            return res.json(res.locals.user);
        }
        else
        {
            return res.sendStatus(400);
        }
    }
});




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