'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Types.ObjectId;

var ArticleSchema = new Schema({
  name: String,
  info: String,
  active: { type: Boolean, default: true },
  gallery: [Schema.Types.ObjectId],
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag'}],
  owner: { type: Schema.Types.ObjectId, ref: 'User', turnOn: false },// turnOn auto creates
  added: { type: Date, default: Date.now },
});

/**
 * Pre-save hook
 */
ArticleSchema
  .pre('save', function(next) {

    if (!this.name)
      next(new Error('Name is a required field'));
    else
      next();
  });

var Article = mongoose.model('Article', ArticleSchema);

Article.findByUserIdQuery = function(userId){
	return Article.find({
		owner : new ObjectId(userId),
		active: true,
	});
};

module.exports = Article;