'use strict';

angular.module('swapApp')
  .controller('MyItemsCtrl', function ($scope, $http, socket) {
    $scope.myArticles = [];

    $http.get('/api/articles').success(function(myArticles) {
      $scope.myArticles = myArticles;
      socket.syncUpdates('article', $scope.myArticles);
    });

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
  });
