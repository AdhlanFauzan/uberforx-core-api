angular
  .module('app')
    .controller('mapController', function($scope, $http, $interval, Order) {
      var map;
      $scope.$on('mapInitialized', function(e, evtMap) {
        map = evtMap;
      });

      $scope.ordersObj = Order.find({});
      $scope.orders =[];
      console.log(Order.find({}));
      var orderCount = 9 ;//$scope.orders.length
      for (var i = 0; i < orderCount; i++) {
        $scope.orders[i] = new google.maps.Marker({
          title: "Order: " + i
        })
      }

      $scope.GenerateMapMarkers = function() {
        var d = new Date(); //To show marker location changes over time
        $scope.date = d.toLocaleString();

        var numMarkers = 9; //between 4 to 8 markers
        for (i = 0; i < numMarkers; i++) {
          if ($scope.ordersObj[i].pickup ){
            var lat = $scope.ordersObj[i].pickup.lat;
            var lng = $scope.ordersObj[i].pickup.lng;
            console.log($scope.ordersObj[i].pickup)
            var loc = new google.maps.LatLng(lat, lng);
            $scope.orders[i].setPosition(loc);
            $scope.orders[i].setMap(map);

          }
          else{

            //To-Do
            //Throw error of location not found
          };


        }
      };

      $interval($scope.GenerateMapMarkers, 2000);
    });