angular.module('authService', [])
  .factory('authFactory', ['$http', '$window', function($http, $window) {

    var auth = {};

    // save token to localStorage
    auth.saveToken = function (token) {
      $window.localStorage['the-hub-token'] = token;
    };

    // grab token from localStorage
    auth.getToken = function () {
      return $window.localStorage['the-hub-token'];
    };

    // check if user is logged in
    auth.isLoggedIn = function () {
      var token = auth.getToken();

      if (token) {
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.exp > Date.now() / 1000;
      }
      else {
        return false;
      }
    };

    // get username of currently logged in user
    auth.currentUser = function () {
      if (auth.isLoggedIn()) {
        var token = auth.getToken();
        var payload = JSON.parse($window.atob(token.split('.')[1]));

        return payload.username;
      }
    };

    // take user to '/register' route, save token returned
    auth.register = function (user) {
      console.log('-----------inside authFactory register!! user: ', user);
      return $http.post('/register', user).success(function(data) {
        auth.saveToken(data.token);
      });
    };

    // take user to '/login' route, save token
    auth.logIn = function (user) {
      console.log('-----------inside authFactory login!! user: ', user);
      return $http.post('/login', user).success(function(data) {
        auth.saveToken(data.token);
      });
    };

    // remove token from localStorage
    auth.logOut = function () {
      $window.localStorage.removeItem('the-hub-token');
    };

    return auth;

  }]);
