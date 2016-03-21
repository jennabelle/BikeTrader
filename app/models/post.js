var mongoose = require('mongoose');
var fs = require('fs');

var postSchema = new mongoose.Schema({

  title: {type: String, default: '', required: true, trim: true, maxlength: 25},
  description: {type: String, default: '', required: true, trim: true, minlength: 3, maxlength: 250},
  color: {type: String, default: '', required: true, trim: true, minlength: 3, maxlength: 25},
  // adjust color type? , because we're going to make a dropdown to choose from for color value.
  price: {type: Number},
  picFile: {type: String},
  email: {type: String},
  dateCreated: {type: String},
  author: { type: String }
});

module.exports = mongoose.model('Post', postSchema);
