angular.module('navCtrl', [])
.controller('navController', ['$scope', 'authFactory', function($scope, authFactory) {

  $scope.isLoggedIn = authFactory.isLoggedIn;
  $scope.currentUser = authFactory.currentUser;
  $scope.logOut = authFactory.logOut;

  // add location path to current scope
  // $scope.currentPath = $location.path();
  // $scope.location = window.location;
  //
  // $scope.currentState = false;
  //
  // if ($scope.location.hash === '#/post') {
  //   $scope.currentState = true;
  // } else {
  //   $scope.currentState = false;
  // }
  // console.log('###############', this);
}]);
