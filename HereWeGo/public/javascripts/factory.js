/**
 * New node file
 */

var ecpServices = angular.module('ecpServices', ['ngResource','ngRoute']);

ecpServices.factory('Trans', ['$resource',
  function($resource){
	
    return $resource('/trans/:start/:end',{},{
    	query: {method:'GET', isArray:true}
    });
    
  }]);

