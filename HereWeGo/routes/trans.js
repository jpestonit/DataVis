/**
 * New node file
 */
var request = require('request');

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