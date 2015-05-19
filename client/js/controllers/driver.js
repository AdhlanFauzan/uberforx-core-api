angular
  .module('app')
  .controller('AllDriversController', ['$scope', 'socket', function($scope, socket){
    $scope.drivers = [];
    socket.on('users', function(data) { // Listening in Socket in Angular Controller
      $scope.drivers = JSON.parse(data);
      console.log('hello');
    })
  }]);