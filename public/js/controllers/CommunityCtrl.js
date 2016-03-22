angular.module('CommunityCtrl', [])


.controller('CommunityController', ['$scope', 'authFactory', function($scope, authFactory){
 
 $scope.currentUser = authFactory.currentUser;

 $scope.comments = [];

 $scope.submitComment = function(){
  $scope.comments.push({user: $scope.user, comment: $scope.comment});
  $scope.comment = '';
 }

 $scope.showTweets = function(){
  
 }

}]);

