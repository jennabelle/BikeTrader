angular.module('navCtrl', [])
.controller('navController', ['$scope', '$location', function($scope, $location) {
  

  // add location path to current scope
  // $scope.currentPath = $location.path();
  $scope.location = window.location;

  $scope.currentState = false;

  if ($scope.location.hash === '#/post') {
    $scope.currentState = true;
  } else {
    $scope.currentState = false;
  }
  console.log('###############', this);
}]);