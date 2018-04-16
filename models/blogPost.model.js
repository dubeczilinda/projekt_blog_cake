const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Torta', 'Brownie', 'Kalács', 'Sütemény'],
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
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)
