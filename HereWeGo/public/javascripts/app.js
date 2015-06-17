'use strict';

/*
 * Main Module config
 */
var ecpApp = angular.module('ecpApp', [
  'ngRoute',
  'ngResource',
  'ecpControllers',
  'ecpServices',
  'dx'
]);


/*
 * Routing for Frontend Of Application
 */
ecpApp.config(['$routeProvider','$httpProvider',
  function($routeProvider,$httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	
    $routeProvider.
      when('/', {
        templateUrl: 'partials/home.html',
        controller: 'EcpCtrl'
      }).
      when('/ecp/:start/:end',{
        templateUrl: 'partials/ecp-detail.html',
        controller: 'EcpCtrl'
      }).
      when('/ecp',{
    	 templateUrl:'partials/ecp-detail.html',
    	 controller: 'EcpCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
     

  }]);
