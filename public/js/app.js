angular.module('bikeTrader', ['ngRoute', 'angular-filepicker', 'postService', 'HomeCtrl', 'PostCtrl', 'CommunityCtrl', 'SignUpCtrl', 'LogInCtrl', 'navCtrl', 'ImageCtrl'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    // nerds page that will use the NerdController
    
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })

    .when('/post', {
      templateUrl: 'views/new-post.html',
      controller: 'PostController'
    })

    .when('/sign-up', {
      templateUrl: 'views/sign-up.html',
      controlller: 'SignUpController'
    })

    .when('/log-in', {
      templateUrl: 'views/login.html',
      controller: 'LogInController'
    })

//JB community route addition
    .when('/community', {
      templateUrl: 'views/community.html',
      controller: 'CommunityController'
    })

    .when('*', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    });

  // $locationProvider.html5Mode(true);

}]);