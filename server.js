const express = require('express');
const path = require('path');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const http = require('http');

const db = require('./config/database');
const postRouter = require('./routes/post.route');

const app = express();

mongoose.connect(db.uri, db.options).then(
    () => {
      console.log('MongoDB connected.')
    },
    err => {
      console.error('MongoDB error.:' + err)
    }
  );

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  
  app.use(bodyParser.json());
  
  app.use(morgan('dev', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));
  
  app.use(helmet());
  
  // Start Browser-Sync
  // views mappában lévő html fájlok - bármilyen mélységben, ha megváltoznak, akkor automatikusan újratölti az oldalt
  if (app.get('env') === 'development') {
    const browserSync = require('browser-sync')
    const config = {
      files: ['views/**/*.html'],
      logLevel: 'info',
      logSnippet: false,
      reloadDelay: 3000,
      reloadOnRestart: true
    }
    const bs = browserSync(config)
    app.use(require('connect-browser-sync')(bs))
  };
  
  app.use('/blogpostapiurl', postRouter);
  
  app.listen(3000);