'use strict';

angular.module('swapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        url: '/items',
        templateUrl: 'app/items/list/list.html',
        controller: 'ItemsCtrl',
      })
      .state('useritems', {
        url: '/items/user/:userId',
        templateUrl: 'app/items/list/list.html',
        controller: 'ItemsCtrl',
      })
      .state('itemdetail', {
        url: '/items/:articleId',
        templateUrl: 'app/items/view/view.html',
        controller: 'ViewItemCtrl',
      })
      .state('edititem', {
        url: '/items/:articleId/edit',
        templateUrl: 'app/items/edit/edit.html',
        controller: 'EditItemCtrl'
      })
      .state('additem', {
        url: '/items/add',
        templateUrl: 'app/items/edit/edit.html',
        controller: 'EditItemCtrl'
      });
  });