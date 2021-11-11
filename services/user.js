const User = require('../models/user');
const Article = require('../models/article');
const {notFound} = require('../config/errorHelper');

module.exports.findUserById = async (req) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('articles');

    if(!user) {
      throw notFound(`User with id ${userId} not found!`);
    }

    return user;

  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.createNewUser = async (req) => {
  try {
    const {body} = req;

    const user = new User(body);

    await user.save();

    return user._id;

  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.updateUser = async (req) => {
  try {
    const {body} = req;

    const {userId} = req.params;

    const user = await User.findByIdAndUpdate(userId, {$set: body}, {new: true, runValidators: true, context: 'query'});

    if(!user) {
      throw notFound(`User with id ${userId} not found!`);
    }

    return user;
    
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.removeUserById = async (req) => {
  try {
    const {userId} = req.params;

    await User.findByIdAndRemove(userId);

    await Article.deleteMany({owner: userId});

  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.getUserArticles = async (req) => {
  try {
    const {userId} = req.params;

    const user = await User.findById(userId).populate('articles');

    if(!user) {
      throw notFound(`User with id ${userId} not found!`);
    }

    return user.articles;

  } catch (err) {
    console.log(err);
    throw err;
  }
}