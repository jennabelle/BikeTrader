angular.module('AuthCtrl', [])
  .controller('AuthController', [ '$scope', '$state', 'authFactory', function ($scope, $state, authFactory) {
    $scope.user = {};

    $scope.register = function () {
      authFactory.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('community');
      });
    };

    $scope.logIn = function () {
      authFactory.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('community');
      });
    };
}]);
