'use strict';

angular.module('frontendApp')
  .controller('UserMoviesCtrl', function ($scope, $stateParams, $http) {
  	var connectedUser = $stateParams.user_id;

  	$scope.connectedUser = connectedUser;
  	console.log(' connectedUse: ', connectedUser);

  	 $http.get('http://localhost:3000/'+connectedUser+'/user_movies')
		.success(function(res){
			$scope.similarUsers = _.chain(res)
									.pluck('Vizinhos')
									.value();
		})
		.error(function (err){
			console.log("ops" + err);
		});
  });
