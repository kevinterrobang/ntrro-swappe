'use strict';

angular.module('swapApp')
	.controller('UserCtrl', function ($scope, $http, $stateParams, Auth){
		$scope.user = {};
		$scope.articles = [];

		if(!$stateParams.userId) $location.path('/');

		$http.get('/api/users/' + $stateParams.userId).success(function(user){
			$scope.user = user;
		});
		
		$http.get('/api/articles?uid=' + $stateParams.userId).success(function(articles){
			$scope.articles = articles;
		});
	});