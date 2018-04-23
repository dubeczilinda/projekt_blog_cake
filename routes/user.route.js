const passport = require('passport');
const userRouter = require('express').Router();
const User = require('../controllers/user.controller');
const BlogPost = require('../controllers/post.controller')

userRouter.get('/', User.getUser);
userRouter.post('/register', User.register);
userRouter.post('/login', passport.authenticate('local'), User.login);
userRouter.get('/logout', User.logout);

userRouter.get('/blog/all', BlogPost.getAllBlogposts);
userRouter.post('/blog/createpost', BlogPost.createBlogpost);
userRouter.get('/blog/findpost', BlogPost.getBlogpost);
userRouter.get('/blog/removepost', BlogPost.removeBlogpost);

module.exports = userRouter;