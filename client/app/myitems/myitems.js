'use strict';

angular.module('swapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myitems', {
      	url: '/myitems',
      	templateUrl: 'app/myitems/myitems.html',
      	controller: 'MyItemsCtrl'
      });
  });