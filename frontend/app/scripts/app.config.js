'use strict';

angular.module('frontendApp').config(function($urlRouterProvider, $stateProvider, $httpProvider) {
	
	$urlRouterProvider.otherwise('/');

	$stateProvider

	.state('main', {
		url: '/',
		templateUrl: '/views/main.html'
	})
//controller:'RegisterCtrl'
	.state('register', {
		url: '/register',
		templateUrl: '/views/register.html',
		
	})

	.state('login', {
		url: '/login',
		templateUrl: '/views/login.html',
		controller:'LoginCtrl'
	})

	.state('films', {
		url: '/films',
		templateUrl: '/views/films.html',
		controller:'FilmsCtrl'
	})

	.state('logout', {
		url: '/logout',
		controller:'LogoutCtrl'
	});

	//$httpProvider.interceptors.push('authInterceptor');
})

.constant('API_URL', 'http://localhost:8080/');