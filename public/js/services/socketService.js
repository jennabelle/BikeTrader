angular.module('socketService', [])

.factory('setSocket', function($rootScope){
  var socket = io.connect('http://localhost:8888');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function ( {
          callback.apply(socket, args);
        }));
      });
    }
  };
});