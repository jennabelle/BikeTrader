// ======================================
// SETUP
// ======================================

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var Post = require('./app/models/post.js');
var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart();
var db = require('./config/db.js');
var passport = require('passport');
var User = require('./app/models/user.js');
var passportConfig = require('./config/passport.js');
var jwt = require('express-jwt');
// middleware for authenticating jwt tokens, use env variable to reference secret!
var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });
var io = require('socket.io').listen(port);

var port = process.env.PORT || 8080;

//JB added code.
var twit = require('twitter');

// ======================================
// CONFIGURATION
// ======================================

// get all data of POST body
app.use(bodyParser.json());

// parse app/vnd as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse app/w-www
app.use(bodyParser.urlencoded({extended: true}));

// override with x-http-method
app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());

// ======================================
// ROUTES
// ======================================

app.get('/getTweets', function(req, res, next) {

  var twitter = new twit({
    consumer_key: 'vIWWtYpagZz1ceoevoReoYDFQ',
    consumer_secret: 'EY4frzRxk4macWbyEVMknaHU3kJwtzYctH1Y8cv4nplSWaUEuA',
    access_token_key: '710623884404334593-uUr0AaxISTPeA4BYyRg31bhyjKtWNHU',
    access_token_secret: 'ToZVApLXWpkiLRbjjGZViN9Q7WD9yAYFB8GlfusHvceUl'
  });

  var tweets = [];

  twitter.stream('statuses/filter', {track: 'bike, biking, cycling, sf bike, sf biking, bay bike, bay biking'}, function(stream){

    stream.on('data', function(data){
      // console.log(util.inspect(data));
      tweets.push(data);
    });

    stream.on('error', function(error) {
      throw error;
    });

    setTimeout(function(){
      for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].user.screen_name + ': ' + tweets[i].text);
      }
      stream.destroy();
      process.exit(0);
    }, 10000);
  });

  // return tweets array
  return res.send(tweets);

});

// get all bike listings
app.get('/api/feed', function(req, res, next) {
  Post.find(function(err, posts) {
    if (err) { return next (err); }
    res.json(posts);
  });
});

var multipart = require('connect-multiparty');

app.use(multipart({
  uploadDir: '/api/post'
}));

// create file upload
exports.create = function(req, res, next) {
  var data = _.pick(req.body, 'type');
  var uploadPath = path.normalize(fcg.data + '/uploads');
  var file = req.files.file;

//   console.log('file.name', file.name); //original file name
//   console.log('file.path', file.path); //tmp path
//   console.log('uploadPath', uploadPath); // uploads directory
};

// create new post
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
    dateCreated: req.body.dateCreated,
    // author: req.payload.username // jenna: need to add 'auth' here first before referenceing payload!
  });
  console.log('\n\n\n newPost', newPost, '\n\n\n');
  // console.log('\n\n\n\n%%%%%%%%%%%%%%%%  req', body, '\n\n\n\n$$$$$$$$$$$$$$');
  newPost.save(function(err, newPost) {
    if (err) { return next(err); }
    res.json(req.body);
  });
});

// register new user
app.post('/register', function (req, res, next) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields.' });
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(function (err) {
    if (err) {
      return next(err);
    }
    return res.json({
      token: user.generateJWT()
    });
  })
});

// login user
app.post('/login', function (req, res, next) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: 'Please fill out all fields. '});
  }

  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.json({
        token: user.generateJWT()
      });
    }
    else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

// ======================================
// Listen (start app with node server.js)
// ======================================

app.listen( port, function() {
  console.log( 'Server listening on port ' + port + '...\n' );
});

module.exports = app;
