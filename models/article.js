const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 400,
    index: 'text',
    required: true,
  },
  subtitle: {
    type: String,
    minlength: 5,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 5000, 
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: String,
    enum: ['sport', 'games', 'history'], 
    required: true,
  }
}, {timestamps: {type: Date, required: true, default: Date.now}});

module.exports = mongoose.model('Article', ArticleSchema);