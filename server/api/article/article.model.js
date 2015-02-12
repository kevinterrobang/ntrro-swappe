'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  gallery: [Schema.Types.ObjectId],
  tags: [Schema.Types.ObjectId],
  owner: Schema.Types.ObjectId,
  added: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Article', ArticleSchema);