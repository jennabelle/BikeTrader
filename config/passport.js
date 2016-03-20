var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { // if user does not exist
        return done(err);
      }
      if (!user) { // if incorrect username
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) { // if incorrect password
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
