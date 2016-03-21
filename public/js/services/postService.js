 // Service to send posts to database
 angular.module('postService', [])
  .factory('PostAd', ['$http', function($http) {

    var postAd = function(post) {
      console.log('success@!!@!@!@', post);

      return $http({
        method: 'POST',
        url: '/api/post',
        data: post
      });
    };

    var showBikes = function() {
      return $http({
        method: 'GET',
        url: '/api/feed'
      })
      .then(function(resp) {
        return resp.data;
      });
    };

    return {
      postAd: postAd,
      showBikes: showBikes
    };

  }]);
