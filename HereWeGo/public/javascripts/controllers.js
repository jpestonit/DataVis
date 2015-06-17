'use strict';


/* Controllers */

var ecpControllers = angular.module('ecpControllers', []);



ecpControllers.controller('EcpCtrl', ['$scope','$routeParams','$http','Trans',
  function($scope,$routeParams,$http,Trans){
	
	//Variables
	
	$scope.trans = [];
    var grid = null;
   
	
  //  $scope.trans =Trans.query({start: $routeParams.start, end: $routeParams.end});
    
	
    /*
     * Request the Data form the WebApi for the Grid for now.
     * ## Will create a resource to query the DB instead.
     */
    
    $http.get('/trans/'+$routeParams.start+'/'+$routeParams.end).
    success(function(data) {


      $scope.trans = data;
     for (var x in $scope.trans)
     {
    	 var current = new Date($scope.trans[x].TrxDate);
    	 var dd = current.getDate();
    	 var mm = current.getMonth()+1;
    	 var yyyy= current.getFullYear();
    	 
    	 $scope.trans[x].TrxDate = mm+'/'+dd+'/'+yyyy;
      
     }

        });
    
    
    /*
     * Date Picker Values
     * and Configuration
     */
    
    $scope.minDate = new Date(2000,0,1);
    $scope.maxDate = new Date(2029,11,31);
    $scope.currentValue = new Date();
    $scope.currentValue2 = new Date();

    $scope.boxOptions = {
    		
    	
    	format:'date',
    	minDate: 'minDate',
    	maxDate: 'maxDate',
    	bindingOptions:{
    	value: 'currentValue'
    	}
    }
    
    $scope.boxOptions2 = {
    		
        	
        	format:'date',
        	minDate: 'minDate',
        	maxDate: 'maxDate',
        	bindingOptions:{
        	value: 'currentValue2'
        	}
        }

    

  /*
   * Grid Config Settings
   */
    $scope.gridSettings = {
		bindingOptions:{ 
		dataSource: 'trans'
			},
			selection: {
		        mode: 'single'
		    },
		showColumnLines:true,
		showRowLines:true,
		rowAlternationEnabled:true,
		paging: {
			pageSize: 38
		},
		searchPanel:{
			visible:true
		},
		grouping:{
			autoExpandAll:false
		},
		groupPanel: {
			visible:false
		},
		columns: [
		          
		          'Quantity',
		          'ReturnQty',
		          'UnitPrice',
		          'CostOfGoods',
		          'ProviderCommission',
		          'Discount',
		          'PhoneGP',
		          'AccGP',
		          'TGP',
		          {
		              dataField: 'LocationCode',
		              groupIndex: 0,
		              width: 'BestFit'
		          },
		          {
		        	  dataField: 'TrxDate',
		              groupIndex: 1
		        		 },
		        	{
		        		dataField: 'ActivationType',
		        		groupIndex:2
		        	}
		        		 
		      ],
		      summary: {
		          groupItems: [ /*{
		              column: 'Quantity',
		              summaryType: 'count',
		              displayFormat: '{0} trans',
		              alignByColumn:true
		          },*/{
		              column: 'PhoneGP',
		              summaryType: 'sum',
		              valueFormat: "currency",
		              displayFormat:"{0}",
		              showInGroupFooter: false,
		              alignByColumn: true
		          }, {
		              column: 'AccGP',
		              summaryType: 'sum',
		              valueFormat: "currency",
		              displayFormat:"{0}",
		              showInGroupFooter: false,
		              alignByColumn: true
		          }, {
		              column: 'TGP',
		              summaryType: 'sum',
		              valueFormat: "currency",
		              displayFormat: "{0}",
		              alignByColumn:true,
		              showInGroupFooter: false
		          }]
		      }
        
         
     
    }
    
  /*---------------------------------------------------------
   *--------------------------------------------------------- 
   */
    
    
	/*
	 * Updates grid when
	 * $scope.Trans changes!
	 */
    
    
	 $scope.add = function() {
    	$scope.trans.push(getInstanceToInsert());
	    };
	    
	    
	    /*
	     * Button Configuration
	     */
	    
	 
	 $scope.buttonOptions = {
			 text: 'search',
			 onClick: '#/trans/currentDate/currentDate2'
	 }
	 
	 
	 
	 /*
	  * Click Hander Function for update the grid when the dates are entered 
	  * and the button is pushed
	  */
	 
	 /*
	 $scope.clickHandler = function (){
		console.log('hey');
		$routeParams.end = $scope.currentValue;
		$routeParams.start = $scope.currentValue2;
		
		
		}*/


  }]);
