angular.module('bikeTrader', ['ui.router', 'angular-filepicker', 'postService', 'HomeCtrl', 'PostCtrl', 'SignUpCtrl', 'LogInCtrl', 'navCtrl', 'ImageCtrl'])
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

  // $routeProvider
  //   .when('/', {
  //     templateUrl: 'views/home.html',
  //     controller: 'HomeController'
  //   })
  //
  //   .when('/post', {
  //     templateUrl: 'views/new-post.html',
  //     controller: 'PostController'
  //   })
  //
  //   .when('*', {
  //     templateUrl: 'views/home.html',
  //     controller: 'HomeController'
  //   });

  // $locationProvider.html5Mode(true);
});
