'use strict';

angular.module('swapApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.menu = [{
      'title': 'Home',
      'link': '/',
    },{
      'title': 'Add Item',
      'link' : '/items/add',
      'loggedInOnly' : true,
    },{
      'title': 'My Clothes',
      'link': '/items/user/me',
      'loggedInOnly' : true,
    }];

    $scope.showItem = function(loggedInOnly){
      return !loggedInOnly || Auth.isLoggedIn();
    };

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });