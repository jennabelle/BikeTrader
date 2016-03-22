angular.module('TweetCtrl', [])
.controller('TweetController', ['$scope', 'setSocket',
	function TweetCtrl ($scope, setSocket) {

		$scope.tweets = [];
		$scope.btnIsDisabled = false;
		$scope.btnText = "Find Tweets From San Francisco"

		$scope.findTweets = function findTweets() {

			setSocket.emit('tweet-io:start', true);

			$scope.btnText = "Brace Yourself, Tweets are coming...";
			$scope.btnIsDisabled = true;

			setSocket.on('tweet-io:tweets', function (data) {
			    $scope.tweets = $scope.tweets.concat(data);
			});
		};
	};
]);
