const blogPost = require('../models/blogPost.model');

module.exports = {
  getAllBlogposts: (req, res) => {
    blogPost.find({}, (err, blogPost) => {
      if (err) {
        res.send(err)
      }
      res.json(blogPost)
    })
  },

  getBlogpost: (req, res) => {
    blogPost.findById(req.params.id, (err, blogPost) => {
      if (err) {
        res.send({
          error: err
        })
      }
      res.json(blogPost)
    })
  },

  createBlogpost: (req, res, next) => {
    blogPost.create(req.body, (err, blogpost) => {
        if (err) {
            res.json({error: err})
        }
        res.json({
            success: 'Sikeresen létrehozva'
        });
    })
},
 
  updateBlogpost: (req, res) => {
    req.body.updatedAt = new Date().toLocaleDateString();
    blogPost.findByIdAndUpdate(req.params.id, req.body, (err, blogPost) => {
      if (err) {
        res.send({
          error: err
        })
      }
      res.json(blogPost)
    })
  },

  removeBlogpost: (req, res) => {
    blogPost.findByIdAndRemove(req.params.id, (err, blogPost) => {
      if (err) {
        res.send({
          error: err
        })
      }
      res.json({
        success: 'Sikeresen törölve'
      })
    })
  }
}