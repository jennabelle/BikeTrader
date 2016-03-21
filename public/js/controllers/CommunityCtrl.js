angular.module('CommunityCtrl', [])


.controller('CommunityController', function($scope){
 
 $scope.comments = [];

 $scope.submitComment = function(){
  $scope.comments.push({user: $scope.user, comment: $scope.comment});
 }


});

