angular
  .module('app')
  .controller('AllDriversController' ,['$scope','Driver', 'socket', '$log', function($scope, Driver, socket, $log){
    //Fetch driverlist from API server
    // $scope.driverList = Driver.find({
    // });
    $scope.$on('socket:error', function (event, data) {
      $log.debug(data)
    });

    $scope.driverList=[];
    socket.emit('new:admin', 'Hello');

    // Listening on event
    $scope.$on('socket:admin:driverlist', function (event, data) {
      $log.debug(data)
      //Put logic inside scope.apply to update when an event is emitted
      $scope.$apply(function(data){
      for (var i = data.length - 1; i >= 0; i--) {
        $scope.driverList[i] = data;
      }
       });
      console.log('something')
      $log.debug($scope.driverList)
    })
  }]);
