const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/users.model');
const Comment = require('../models/comments.model');

const BlogPostSchema = new mongoose.Schema({
  _author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: {
    type: String,
    enum: ['Torta', 'Brownie', 'Kalács', 'Sütemény', 'Gyümölcsös'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }], 
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('BlogPost', BlogPostSchema)
