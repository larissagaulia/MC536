'use strict';

angular.module('frontendApp')
  .controller('UserMoviesCtrl', function ($scope, $stateParams, $http) {
  	var connectedUser = $stateParams.user_id;

  	$scope.connectedUser = connectedUser;
  	console.log(' connectedUse: ', connectedUser);
  	var getPhoto = function (film){
  		console.log('getting photo of:', film.nome);
  		var imdbID = film.imdb_id;
  		$http.get('http://www.omdbapi.com/?i='+imdbID)
  			.success(function (res){
  				film.additionalInfo = res;
  			});
  	};

  	 $http.get('http://localhost:3000/'+connectedUser+'/user_movies')
		.success(function(res){
			console.log(res);
			$scope.recommendedFilms = _.chain(res)
									.pluck('filme')
									.pluck('properties')
									.forEach(getPhoto)
									.value();
		})
		.error(function (err){
			console.log("ops" + err);
		});
  });
