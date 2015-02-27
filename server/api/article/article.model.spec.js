'use strict';

var should = require('should');
var app = require('../../app');
var Article = require('./article.model');

var article = new Article({
  name: 'Test Name',
  info: 'Test info description',
});

describe('Article Model', function() {
  before(function(done) {
    // Clear articles before testing
    Article.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Article.remove().exec().then(function() {
      done();
    });
  });

  it('should require a name', function(done) {
    article.name = '';
    article.save(function(err, articles) {
      should.exist(err);
      done();
    });
  });
});
