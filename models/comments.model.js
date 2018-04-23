const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('../models/users.model');

const CommentSchema = new mongoose.Schema({
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blogTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamp: true
});

module.exports = mongoose.model('Comment', CommentSchema);