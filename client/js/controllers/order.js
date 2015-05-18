angular
  .module('app')
  .controller('AllOrdersController', ['$scope', 'Order', function($scope,
      Order) {
    $scope.orderList = Order.find({
    });
  }])
  .controller('AddOrderController', ['$scope', 'Org', 'Order',
      '$state', function($scope, Org, Order, $state) {
    $scope.action = 'Add';
    $scope.selectedOrg;
    $scope.order = {};
    $scope.isDisabled = false;
    // $scope.map = { center: { latitude: 19.1140324, longitude: 72.9237601 }, zoom:  14};

    // Org
    //   .find()
    //   .$promise
    //   .then(function(orgs) {
    //     $scope.orgs = orgs;
    //     $scope.selectedOrg = $scope.selectedOrg || orgs[0];
    //   });

    $scope.submitForm = function() {
      Order
        .create({
          pickupAt: $scope.order.pickupAt,
          deliverAt: $scope.order.dropAt,
          comments: $scope.order.comments

          // orgId: $scope.selectedOrg.id
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
