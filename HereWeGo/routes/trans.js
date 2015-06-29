/**
 * New node file
 */
var sql = require('mssql');
var request = require('request');

 var config = {
  user: 'sa',
  password: 'ecpadmin123',
  server: '2K3SERVER',
  database: 'Executive Cellular'
}

var levels = [];

var db = new sql.Connection(config);

exports.data = function(req,res){
	var start = req.params.start;
	  var end = req.params.end;
	  var trans = [];

	  request('http://webapi.executivecellularphones.com/api/gp/'+start+'/'+end,function(error,response,body){
	    if(error){
	      return console.log('Error:', error);
	    }
	    if(response.statusCode != 200){
	      return console.log('Invalid:', response.statusCode);
	    }
	    trans = JSON.parse(body);
	  
	    /*
	  res.json({
	    trans: JSON.parse(body)
	  });*/
	    res.send(trans);

	});
}

exports.levels = function(req,res){
	
	console.log('In the levels function');

	var connection = new sql.Connection(config, function(err)
	{
	var db = new sql.Request(connection);
	

    	
		db.execute('ECP_Tree_Data', function(err, recordsets)
		{	if(levels.length!==0){
			levels = [];
		}
			//console.log(recordsets);

			
			for(var key in recordsets) 
			{   
				var level = recordsets[key];
				levels.push(level);
			}
		
			console.log(levels);
		
		});



	});
	
	res.send(levels);

};

