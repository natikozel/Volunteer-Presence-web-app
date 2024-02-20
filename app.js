"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors = require('cors');
const express_1 = __importDefault(require("express"));
const names_1 = __importDefault(require("./data/names"));
const nodemailer = require('nodemailer');
const session = require('express-session');
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./data/users"));
const store = new session.MemoryStore();
const app = (0, express_1.default)();
const PORT = 4000;
app.use(express_1.default.static('public'));
app.use(body_parser_1.default.json());
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
});
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
}));
app.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.sessionID, req.session);
    const { email, password } = req.body.data;
    let user;
    if (email && password)
        if (req.session.authenticated)
            return res.json(req.session);
        else
            user = users_1.default.find(user => user.email === email); // TODO pass
    else
        return res.status(401).json({ message: 'Login failed' });
    if (!user)
        return res.status(401).json({ message: 'Bad credentials' });
    req.session.authenticated = true;
    req.session.user = { email, password };
    res.status(200).json({ session: req.session, data: names_1.default });
}));
app.get('/mail', (req, res, next) => {
    transporter.sendMail(mailOptions, (err) => {
        console.log(err);
        res.json({ message: 'sent mail' });
    });
});
app.listen(PORT, () => {
    console.log("Server listening on PORT", PORT);
});
