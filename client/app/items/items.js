'use strict';

angular.module('swapApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('items', {
        url: '/items',
        templateUrl: 'app/items/list/list.html',
        controller: 'ItemsCtrl'
      })
      .state('items.user', {
        url: '/user/:userId',
        templateUrl: 'app/items/view/view.html',
        controller: 'ItemsCtrl'
      })
      .state('items.detail', {
        url: '/:articleId',
        templateUrl: 'app/items/view/view.html',
        controller: 'ViewItemCtrl',
        resolve: {
          articleId: ['$stateParams', function ($stateParams){
            return $stateParams.articleId;
          }]
        },
      })
      .state('items.detail.edit', {
        url: '/edit',
        templateUrl: 'app/items/edit/edit.html',
        controller: 'EditItemCtrl'
      })
      .state('items.add', {
        url: '/add',
        templateUrl: 'app/items/edit/edit.html',
        controller: 'EditItemCtrl'
      });
  });