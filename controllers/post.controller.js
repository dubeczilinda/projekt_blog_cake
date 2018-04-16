const Post = require('../models/blogPost.model');

module.exports = {
  list: (req, res) => {
    Post.find({}, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  find: (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  create: (req, res) => {
    Post.create(req.body, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  update: (req, res) => {
    req.body.updatedAt = new Date().toLocaleDateString();
    Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  },

  remove: (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err)
      }
      res.json(post)
    })
  }
}