'use strict';

angular.module('swapApp')
	.controller('EditItemCtrl', function ($scope, $http, $stateParams, socket) {
		console.log('EditItemCtrl');
		$scope.article = {};
	});