angular
  .module('app')
  .controller('AllOrdersController', ['$scope', 'Order','socket', function($scope,
      Order, socket) {
    $scope.drivers = [];
    $scope.orderList = Order.find({
    });
    // for (var i = orderList.length - 1; i >= 0; i--) {
    //   orderList[i]
    // };
    socket.on('users', function(data) { // Listening in Socket in Angular Controller
      // $scope.drivers = JSON.parse(data);
      console.log(data);
    });

  }])
  .controller('AddOrderController', ['$scope', 'Org', 'Order',
      '$state', function($scope, Org, Order, $state) {
    $scope.action = 'Add';
    $scope.selectedOrg;
    $scope.order = {};
    $scope.isDisabled = false;


    $scope.submitForm = function() {
      Order
        .create({
          pickupAt: $scope.order.pickupAt,
          deliverAt: $scope.order.dropAt,
          comments: $scope.order.comments
        })
        .$promise
        .then(function() {
          $state.go('all-orders');
        });
    };
  }])
  .controller('DeleteOrderController', ['$scope', 'Order', '$state',
      '$stateParams', function($scope, Review, $state, $stateParams) {
    Order
      .deleteById({ id: $stateParams.id })
      .$promise
      .then(function() {
        $state.go('my-orders');
      });
  }])
  .controller('EditOrderController', ['$scope', '$q', 'Org', 'Order',
      '$stateParams', '$state', function($scope, $q, Org, Order,
      $stateParams, $state) {
    $scope.action = 'Edit';
    $scope.orgs = [];
    $scope.selectedOrg;
    $scope.order = {};
    $scope.isDisabled = true;

    $q
      .all([
        Org.find().$promise,
        Order.findById({ id: $stateParams.id }).$promise
      ])
      .then(function(data) {
        var orgs = $scope.orgs = data[0];
        $scope.order = data[1];
        $scope.selectedOrg;

        var selectedOrgIndex = orgs
          .map(function(org) {
            return org.id;
          })
          .indexOf($scope.review.orgId);
        $scope.selectedOrg = orgs[selectedOrgIndex];
      });

    $scope.submitForm = function() {
      $scope.order.orgId = $scope.selectedOrg.id;
      $scope.order
        .$save()
        .then(function(review) {
          $state.go('all-orders');
        });
    };
  }])
  .controller('MyOrdersController', ['$scope', 'Order', '$rootScope',
      function($scope, Order, $rootScope) {
    $scope.orders = Order.find({
    });
  }]);
