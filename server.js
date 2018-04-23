const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rfs = require('rotating-file-stream');
const cors = require('cors');

const db = require('./config/database');
const User = require('./models/users.model');
const BlogPost = require('./models/blogPost.model');
const userRouter = require('./routes/user.route');

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 3000;
const app = express();

///--- engedélyezés az angularra
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

mongoose.connect(db.uri, db.options)
.then(connection => {
      console.log('MongoDB connected.')
    })
    .catch(error => {
      console.error('MongoDB error.:' + err)
    }
  );

//hibaüzenetek loggolása egy külön mappába
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
let accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory
})
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400
}));

  app.use(helmet());

  app.use(cors());

   app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(cookieParser());

  app.use(session({
    secret: 'Your_Secret_Key',
    resave: true,
    saveUninitialized: true
  }))

//Passport Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


  
  app.use('/', userRouter);
  app.use('/blog', userRouter);


  
  app.listen(port);
  console.log('The magic happens on port ' + port);