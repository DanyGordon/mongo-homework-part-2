const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String, 
    minlength: 4, 
    maxlength: 50, 
    required: true
  },
  lastName: {
    type: String, 
    minlength: 3, 
    maxlength: 60, 
    required: true
  },
  role: {
    type: String, 
    enum: ['admin', 'writer', 'guest'],
  },
  numberOfArticles: {
    type: Number, 
    default: 0,
  },
  nickname: {
    type: String
  },
  articles: [
    {type: Schema.Types.ObjectId, ref: 'Article'}
  ]
}, { 
  timestamps: { 
    createdAt: true,
    updatedAt: false,
  },
});

UserSchema.methods.incrementNumberOfArticles = function () {
  this.numberOfArticles += 1
};

UserSchema.methods.decrementNumberOfArticles = function () {
  this.numberOfArticles -= 1
};

module.exports = mongoose.model('User', UserSchema);