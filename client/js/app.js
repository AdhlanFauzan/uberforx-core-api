angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ngMap',
    'btford.socket-io'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('add-order', {
        url: '/add-order',
        templateUrl: 'views/order-form.html',
        controller: 'AddOrderController',
        authenticate: true
      })
      .state('all-orders', {
        url: '/all-orders',
        templateUrl: 'views/all-orders.html',
        controller: 'AllOrdersController'
      })
      .state('edit-order', {
        url: '/edit-order/:id',
        templateUrl: 'views/order-form.html',
        controller: 'EditOrderController',
        authenticate: true
      })
      .state('delete-order', {
        url: '/delete-order/:id',
        controller: 'DeleteOrderController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('my-orders', {
        url: '/my-orders',
        templateUrl: 'views/my-orders.html',
        controller: 'MyOrdersController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('all-orders');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }])
  .factory('socket', function (socketFactory) {
  var myIoSocket = io.connect('http://localhost:5000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  mySocket.forward('error');
  mySocket.forward('admin:driverlist');

  return mySocket;
});
