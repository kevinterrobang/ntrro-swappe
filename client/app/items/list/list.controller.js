'use strict';

angular.module('swapApp')
  .controller('ItemsCtrl', function ($scope, $http, $stateParams, Auth) {

    console.log('ItemsCtrl');
    _.forIn($stateParams, function(value, key){
      console.log('param: ' + key + ' | ' + value);
    });

    $scope.articles = [];
    $scope.user = {};
    
    if($stateParams['userId'] && $stateParams['userId'] != 'me'){
      $scope.user = $stateParams['userId'];
    }
    else{
      $scope.user = Auth.getCurrentUser()._id.toString();
    }

    $http.get('/api/articles?uid='+$scope.user).success(function(articles) {
      console.log('articles found: ' + articles.length);
      $scope.articles = articles;
    });

    $scope.ownsArticle = function(article){
      //console.log('  article owner: ' + article.owner.toString());
      //console.log('auth user owner: ' + Auth.getCurrentUser()._id.toString());
      return Auth.getCurrentUser()._id.toString() == article.owner.toString();
    };

/*
    $scope.addArticle = function() {
      if($scope.newArticle === '') {
        return;
      }
      $http.post('/api/articles', { name: $scope.newArticle });
      $scope.newArticle = '';
    };

    $scope.deleteArticle = function(article) {
      $http.delete('/api/articles/' + article._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('article');
    });
*/
  });
