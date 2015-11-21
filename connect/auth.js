var basic = require('basic-auth'); 
var db = require('./db.js');
var crypto = require('crypto');
var async = require('async');


module.exports = function () {
	return function (request, response, next) {
		var credentials = basic(request);
		async.waterfall([function (next){
			 db.cypher({
		      	query : 'MATCH (u:User {email : {email}, password : {pwd}}) RETURN u',
		      	params: {email: credentials.name, pwd : credentials.pass}
		    }, next);
		}, function (users, next){
			if(users.length === 0){
		    	return next(new Error('Invalid Session'));
		    }
		    else{
		   		request.user = users[0];
		     	next();
		    }
		}], next);
	}
}