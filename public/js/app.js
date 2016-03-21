angular.module('bikeTrader', ['ui.router', 'angular-filepicker', 'postService', 'authService', 'AuthCtrl', 'HomeCtrl', 'PostCtrl', 'CommunityCtrl', 'navCtrl', 'ImageCtrl'])
.config( function( $stateProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('/', {
      url: '/community',
      templateUrl: '../views/community.html',
      controller: 'CommunityController'
    })

    .state('home', {
      url: '/home',
      templateUrl: '../views/home.html',
      controller: 'HomeController'
    })

    .state('post', {
      url: '/post',
      templateUrl: '../views/new-post.html',
      controller: 'PostController'
    })

    .state('login', {
      url: '/login',
      templateUrl: '../views/login.html',
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
      templateUrl: '../views/register.html',
      controller: 'AuthController',
      // check if user is authenticated before entering state, redirect to home if logged in
      onEnter: [ '$state', 'authFactory', function($state, authFactory) {
        if (authFactory.isLoggedIn()) {
          $state.go('home');
        }
      }]
    })

    .state('community', {
      url: '/community',
      templateUrl: '../views/community.html',
      controller: 'CommunityController'
    })

    .state('logout', {
      url: '/logout',
      templateUrl: '../views/login.html',
      controller: 'AuthController',
      // check if user is authenticated before entering state, redirect to home if logged in
      onEnter: [ '$state', 'authFactory', function($state, authFactory) {
        if (authFactory.isLoggedIn()) {
          $state.go('home');
        }
      }]

    });
});
