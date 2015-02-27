'use strict';

angular.module('swapApp')
	.controller('ViewItemCtrl', function ($scope, $http, $stateParams, Auth){
		console.log('ViewItemCtrl');

		if(!$stateParams.articleId){
			console.log('no article ID. Redirect to... my list?');
			$location.path('/items');
		}

		$scope.article = {};

		$http.get('/api/articles/' + $stateParams.articleId).success(function(article){
			$scope.article = article;
		});
	});