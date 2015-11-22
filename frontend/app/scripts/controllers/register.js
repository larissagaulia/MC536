'use strict';

angular.module('frontendApp')
.controller('RegisterCtrl', function ($scope, $http) {
	$scope.submit = function() {
		var url = 'http://localhost:3000/register';
		var user = {
			email: "l@l.com.br"
		};
		console.log('in submit');

	   $http.post(url, user)
		   .success(function(res){
		   		console.log("Good. You are registered");
		   })
		   .error(function (err){
		   		console.log("Bad. You are not registered" + err);
		   });
	};		

  });