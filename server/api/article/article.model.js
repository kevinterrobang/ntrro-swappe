'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  gallery: [Schema.Types.ObjectId],
  tags: [Schema.Types.ObjectId],
  owner_id: Schema.Types.ObjectId,
  added: { type: Date, default: Date.now },
});

var Article = mongoose.model('Article', ArticleSchema);

Article.findByUserId = function(userId, cb){
	return Article.find({
		owner_id : userId,
		active: true,
	}, cb);
};

module.exports = Article;