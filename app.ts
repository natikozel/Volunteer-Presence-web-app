const cors = require('cors');
// import cors from 'cors'
import fs from 'fs'
import express from 'express'
import ALL_NAMES, {Name} from "./data/names";

const nodemailer = require('nodemailer');
const session = require('express-session')
import bodyParser from 'body-parser'
import {Request, Response, NextFunction} from 'express';
import ALL_USER, {User} from './data/users'

const store = new session.MemoryStore();
const app = express();
const PORT = 4000

app.use(express.static('public'));
app.use(bodyParser.json());

// CORS

// app.use('/', async (req: Request, res: Response, next: NextFunction) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
//     res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lopupels@gmail.com',
        pass: 'kozelnono123852tt'
    }
})

const mailOptions = {
    from: 'The Idea project',
    to: 'netanelkozel@gmail.com',
    subject: 'My first Email!!!',
    text: "This is my first email. I am so excited!"
};

app.use(cors());
app.use(session({
    secret: 'my secret',
    resave: false,
    cookie: {
        maxAge: 300,
    },
    saveUninitialized: false,
    store: store
}))
app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.sessionID, req.session);
    const {email, password} = req.body.data
    let user: User | undefined;
    if (email && password)
        if (req.session.authenticated)
            return res.json(req.session)
        else
            user = ALL_USER.find(user => user.email === email); // TODO pass
    else
        return res.status(401).json({message: 'Login failed'})
    if (!user)
        return res.status(401).json({message: 'Bad credentials'});

    req.session.authenticated = true;
    req.session.user = {email, password};
    res.status(200).json({session: req.session, data: ALL_NAMES});
});

app.get('/mail', (req, res, next) => {
    transporter.sendMail(mailOptions, (err: any) => {
        console.log(err)
        res.json({message: 'sent mail'});
    })
})


app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
})