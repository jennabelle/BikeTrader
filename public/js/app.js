angular.module('bikeTrader', ['ui.router', 'angular-filepicker', 'postService', 'authService', 'AuthCtrl', 'HomeCtrl', 'PostCtrl', 'navCtrl', 'ImageCtrl'])
.config( function( $stateProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('/', {
      url: '/home',
      templateUrl: '../views/home.html'
    })

    .state('post', {
      url: '/post',
      templateUrl: '../views/new-post.html'
    })

    .state('login', {
      url: '/login',
      templateUrl: '/login.html',
      controller: 'AuthController',
      // check if user is authenticated before entering state, redirect to home if logged in
      onEnter: [ '$state', 'authFactory', function($state, authFactory) {
        if (authFactory.isLoggedIn()) {
          $state.go('home');
        }
      }]
    })

    .state('register', {
      url: '/register',
      templateUrl: '/register.html',
      controller: 'AuthController',
      // check if user is authenticated before entering state, redirect to home if logged in
      onEnter: [ '$state', 'authFactory', function($state, authFactory) {
        if (authFactory.isLoggedIn()) {
          $state.go('home');
        }
      }]
    });

});
