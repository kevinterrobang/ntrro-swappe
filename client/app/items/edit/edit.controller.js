'use strict';

angular.module('swapApp')
	.controller('EditItemCtrl', function ($scope, $http, $stateParams, $timeout, socket) {
		console.log('EditItemCtrl');
		$scope.article = {};
		$scope.buttonText = 'Add';

		$scope.loadingText = 'Loading...';
		$scope.showLoading = true;

		$scope.successText = 'Done!';
		$scope.showSuccess = false;

		$scope.postingText = 'Saving...';
		$scope.showPosting = false;

		$scope.showError = false;
		$scope.errorText = 'Error! Not Saved!';

		if($stateParams.articleId){
			$http.get('/api/articles/' + $stateParams.articleId).success(function(article){
				$scope.article = article;
				$scope.buttonText = 'Edit';
				$scope.showLoading = false;
				//socket.syncUpdates('article', $scope.article);
				//console.log('syncing updates for: '+$scope.article.name);
			});
		}
		else{
			$scope.showLoading = false;
		}

		$scope.submitArticle = function(){
			if(!$scope.article.name){
				return;
			}
			$scope.showPosting = true;

			var promise = $scope.article._id ?
							$http.put('/api/articles/' + $scope.article._id, $scope.article) :
							$http.post('/api/articles', $scope.article);

			promise.success($scope._success)
					.error($scope._error)
					.finally($scope._notPosting);
		};

		// *************************** //
		// PRIVATE METHODS / CALLBACKS //
		// *************************** //
		$scope._notPosting = function(){
			$scope.showPosting = false;
		};

		$scope._error = function(data, status, headers, config){
			$scope.showError = true;
			$timeout(function(){
				$scope.showError = false;
			}, 4000);
		};

		$scope._success = function(article){
			$scope.article = article;
			$scope.showSuccess = true;
			$timeout(function(){
				$scope.showSuccess = false;
			}, 2000);
			$scope.buttonText = 'Edit';
			console.log('received article ID: ' + article._id.toString());
			console.log('   scope article ID: ' + $scope.article._id.toString());
		};
	});