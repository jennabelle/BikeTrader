angular.module('AuthCtrl', [])
  .controller('AuthController', [ '$scope', '$state', 'authFactory', function ($scope, $state, authFactory) {
    $scope.user = {};

    $scope.register = function () {
      authFactory.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function(response) {
        $state.go('home');
      });
    };

    $scope.logIn = function () {
      console.log('--------------------inside AuthController $scope.logIn!');
      authFactory.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function(response) {
        console.log('---------inside AuthController login! this is what $http returned: ', response.body);
        $state.go('home');
      });
    };
}]);
