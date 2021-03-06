/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /articles              ->  index
 * POST    /articles              ->  create
 * GET     /articles/:id          ->  show
 * PUT     /articles/:id          ->  update
 * DELETE  /articles/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Article = require('./article.model');

// Get list of articles
exports.index = function(req, res) {

  var query;
  if(req.query.uid) {
    query = Article.findByUserIdQuery(req.query.uid);
  }

  else if(req.query.s){
    query = Article.find({ name: new RegExp(req.query.s, "i") }).populate('owner');
  }

  else {
    query = Article.find({ active: true }).populate('owner');
  }

  query.exec(function(err, articles){
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id).populate('owner').exec(function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  if(!req.user._id) { return res.send(401); }
  req.body.owner = req.user._id;
  Article.create(req.body, function(err, article) {
    if(err) { return handleError(res, err); }
    return res.json(201, article);
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    // TODO: allow for owner changes
    req.body.owner = article.owner; // retain ownership by ID
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.active = false;
    article.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}