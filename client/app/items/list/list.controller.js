'use strict';

angular.module('swapApp')
  .controller('ItemsCtrl', function ($scope, $http, Auth) {
    $scope.articles = [];

    $http.get('/api/articles').success(function(articles) {
      $scope.articles = articles;
      /*$scope.articles = [{title:'Title One',},{title:'Title Two'}];*/
    });

    this.ownsArticle = function(article){
      return article.owner._id.equals(Auth.getCurrentUser._id);
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
