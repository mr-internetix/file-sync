// imports
require('dotenv').config('.env');

const cookieParser = require("cookie-parser");

const csrf = require("csurf");

const bodyParser = require("body-parser");

const csrfMiddleware = csrf({cookie: true});

const admin = require("firebase-admin");

const compression = require('compression');

const express = require('express');

const app = express();

const cors = require("cors")

var corsOptions = {
    origin: "http://localhost:3000"
  };

app.use(cors(corsOptions));


app.use(compression());

const path = require('path');

const PORT = process.env.PORT || 3000;

// const PORT = process.env.PORT ;

const connectDB = require('./config/db');

// firebase auth key 

const serviceAccount = require("./serviceAccountKey.json");


// initializing firbase admin

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://server-auth-41acc.firebaseio.com",
});



// public folder for sharing static files

app.use('/static', express.static('public'));

//connecting to db 

connectDB();

// template engine 

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');


// using bodyParser as a middle ware  

// Routes

app.get('/',(req,res)=>{
    res.sendFile(path. join(__dirname + '/views/home.html'));
});

app.get('/send',(req,res)=>{
    res.sendFile(path. join(__dirname + '/views/send.html'));
});

// encrypt routes 
app.get('/encrypt',(req,res)=>{
    res.sendFile(path. join(__dirname + '/views/encrypt.html'));
});
app.use('/api/encrypt',require("./routes/encrypt"));

app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


// routes for login and sign up 

app.use(bodyParser.json());
app.use(cookieParser());
app.use(csrfMiddleware);



app.all("*", (req, res, next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken());
    next();
});


app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/views/sign-in.html"));
});



// session handling routes 

app.post("/sessionLogin", (req, res) => {

    const idToken = req.body.idToken.toString();
 
    const expiresIn = 60*60*24*5*1000;
    admin
    .auth()
    .createSessionCookie(idToken,{expiresIn})
    .then(
        (sessionCookie) =>{
        const options = {maxAge:expiresIn, httpOnly:true};
        res.cookie("session",sessionCookie,options);
        res.end(JSON.stringify({status:"success"}));
        },
        (error)=>{
            res.status(401).send("unauthorised access");
        });
    
});


app.get("/sessionLogout",(req,res)=>{
    res.clearCookie("session");
    res.redirect("/")
});


// logged in users routes section 

app.use('/usersignin',require('./routes/user.js'));


app.use('/profile',require('./routes/profile.js'));

app.use('/api/v2',require('./routes/userfiles.js'));

// getting user files 

app.use('/userfilesupload',require('./routes/filemanager.js'));

// download files 

app.use('/filedownload',require('./routes/fileDownload.js'));

// listening on port
app.listen(PORT,()=>{
    console.log(`listening on http://localhost:${PORT}`)
}); 
