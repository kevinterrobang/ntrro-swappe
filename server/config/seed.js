/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Article = require('../api/article/article.model');

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function(err, testUser, adminUser) {
      console.log('finished populating users');
      createArticles(testUser, adminUser);
    }
  );
});

var createArticles = function(testUser, adminUser){
  Article.find({}).remove(function(){

    Article.create({
      name: 'Orange Blouse',
      info: 'This is a very nice orange blouse.',
      owner: testUser._id,
    }, {
      name: 'Red Blouse',
      info: 'This is a very nice red blouse.',
      owner: testUser._id,
    }, {
      name: 'Purple Blouse',
      info: 'This is a very nice purple blouse.',
      owner: testUser._id,
    }, {
      name: 'Purple Blouse',
      info: 'This is a very nice purple blouse.',
      owner: adminUser._id,
    }, {
      name: 'Green Blouse',
      info: 'This is a very nice green blouse.',
      owner: adminUser._id,
    }, function(){
      console.log('finished populating articles');
    });
  });
};