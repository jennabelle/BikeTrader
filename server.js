// modules
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Post = require('./app/models/post.js');
var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart();
// configure and connect to database
var db = require('./config/db.js');
//JB added code. 
var io = require('socket.io').listen(port);

var port = process.env.PORT || 8080;




// get all data of POST body
app.use(bodyParser.json());

// parse app/vnd as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse app/w-www
app.use(bodyParser.urlencoded({extended: true}));

// override with x-http-method 
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

// routes will go here*************************************************
// set up routes and require here

// route for getting all bike listings
app.get('/api/feed', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) { return next (err); }
    // console.log('posts', posts);
    res.json(posts);
  });
});


var multipart = require('connect-multiparty');

app.use(multipart({
  uploadDir: '/api/post'
}));


// // create file upload
exports.create = function(req, res, next) {
  var data = _.pick(req.body, 'type');
  var uploadPath = path.normalize(fcg.data + '/uploads');
  var file = req.files.file;

//   console.log('file.name', file.name); //original file name
//   console.log('file.path', file.path); //tmp path
//   console.log('uploadPath', uploadPath); // uploads directory
};


// route for creating a new bike listing
app.post('/api/post', multipartMiddleWare, function(req, res, next) {
  console.log('\n\n\n req keys', Object.keys(req), '\n\n');
  console.log('\n\n\n\n req body', req.body, '\n\n\n');
  var newPost = new Post({
    title: req.body.title,
    description: req.body.description,
    color: req.body.color,
    price: req.body.price,
    picFile: req.body.picFile,
    email: req.body.email,
    dateCreated: req.body.dateCreated
  });
  console.log('\n\n\n newPost', newPost, '\n\n\n');
  // console.log('\n\n\n\n%%%%%%%%%%%%%%%%  req', body, '\n\n\n\n$$$$$$$$$$$$$$');
  newPost.save(function(err, newPost) {
    if (err) { return next(err); }
    res.json(req.body);
  });

});

// start app
app.listen(port);

// shout out to the user
console.log('Listening on port:', port);

module.exports = app;