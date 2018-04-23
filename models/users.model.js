const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId, 
    default: () => { return new mongoose.Types.ObjectId()} 
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: name => name.length > 5,
      message: 'A felhasználónévnek hosszabbnak kell lennie, mint 5 karakter'
    }
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  blogposts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost'
  }]
}, {
  timestamps: true
});


userSchema.plugin(passportLocalMongoose, {
  maxAttempts: 5,
  hashField: 'password',
  usernameUnique: true
});


module.exports = mongoose.model('User', userSchema)