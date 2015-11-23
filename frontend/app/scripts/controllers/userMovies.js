'use strict';

angular.module('frontendApp')
  .controller('UserMoviesCtrl', function ($scope, $stateParams, $http) {
  	var connectedUser = $stateParams.user_id;

  	$scope.connectedUser = connectedUser;
  	console.log(' connectedUse: ', connectedUser);

  	 $http.get('http://localhost:3000/'+connectedUser+'/user_movies')
		.success(function(res){
			console.log(res);
			$scope.recommendedFilms = _.chain(res)
									.pluck('filme')
									.pluck('properties')
									.value();
		})
		.error(function (err){
			console.log("ops" + err);
		});
  });
