var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  hash: String,
  salt: String
}, { collection: 'User' });

// when user sets password
UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex'); // iterate over 1000x
};

// if user has correct password
UserSchema.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
}

// generate json web token
UserSchema.methods.generateJWT = function () {

  // set expiration to 60 days
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60); // Unix timestamp in seconds when token expires

  return jwt.sign({ // payload that gets signed, both server and client have access to this payload
    _id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000)
  }, 'SECRET'); // jenna: use environment variable to reference secret and keep out of codebase
};

module.exports = mongoose.model('User', UserSchema);
