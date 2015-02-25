'use strict';

angular.module('swapApp')
  .controller('ItemsCtrl', function ($scope, $http) {
    $scope.myArticles = [];

    $http.get('/api/articles').success(function(myArticles) {
      $scope.myArticles = myArticles;
    });

    this.ownsArticle = function(article){
      return article.owner._id.equals($scope.getCurrentUser._id);
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
