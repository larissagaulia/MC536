'use strict';

angular.module('frontendApp').config(function($urlRouterProvider, $stateProvider, $httpProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})

	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		controller:'RegisterCtrl'
	})

	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller:'LoginCtrl'
	})

	.state('user_movies', {
		url: '/:user_id/user_movies',
		templateUrl: '/views/user_movies.html',
		controller:'UserMoviesCtrl'
	})

	.state('logout', {
		url: '/logout',
		controller:'LogoutCtrl'
	});

	//$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:3000/');