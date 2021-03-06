'use strict';

angular.module('swapApp')
  .controller('MainCtrl', function ($scope, $http, Auth) {

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.showSearchResults = false;

    $scope.search = function(){
      if(!$scope.searchTerms) return;
      $http.get('/api/articles?s='+$scope.searchTerms).success(function(articles){
        $scope.searchArticles = articles;
        $scope.showSearchResults = true;
      });
    };
/*
    // Currenty, none of this is used...
    // I'm leaving it for reference...
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
*/
  });
