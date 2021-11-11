const Article = require('../models/article');
const User = require('../models/user');
const {notFound, badRequest} = require('../config/errorHelper');
const {createQueryFromQueryParams} = require('../config/util');

module.exports.createNewArticle = async (req) => {
  try {
    const {body} = req;

    const ownerId = body.owner;

    const user = await User.findById(ownerId);

    if(!user) {
      throw notFound(`User with id ${ownerId} not found!`);
    }

    const article = new Article(body);

    await article.save();

    user.articles.push(article._id);

    user.incrementNumberOfArticles();

    await user.save();

  } catch (err) {
    console.log(err);
    if(err.name === 'ValidationError') {
      throw badRequest('Fields title, description, category and owner are required!');
    }
    throw err;
  }
}

module.exports.searchArticles = async (req) => {
  try {
    const { 
      skip = 0, 
      limit = 10,
      created,
      updated
    } = req.query;

    if(created || updated) {
      if((created && Number.isNaN(Date.parse(created)))) {
        throw badRequest('Query parametr \'created\' can\' be parsed as Date!')
      }

      if((updated && Number.isNaN(Date.parse(updated)))) {
        throw badRequest('Query parametr \'updated\' can\' be parsed as Date!')
      }
    }

    const query = createQueryFromQueryParams(req.query);

    const articles = await Article.find(query)
      .populate('owner')
      .skip(skip)
      .limit(limit);

    return articles;

  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports.updateArticle = async (req) => {
  try {
    const {articleId} = req.params;

    const {body} = req;

    const article = await Article.findById(articleId);

    if(!article) {
      throw notFound(`Article with id ${articleId} not found!`);
    }

    const user = await User.findById(article.owner);

    if(!user) {
      throw notFound(`User with id ${article.owner} not found!`);
    }

    const updated = await Article.findByIdAndUpdate(articleId, {$set: body}, {runValidators: true, context: 'query'});

    return updated;

  } catch (err) {
    console.log(err);
    if(err.name === 'ValidationError') {
      throw badRequest('Fields title, description, category and owner are required!');
    }
    throw err;
  }
}

module.exports.removeArticle = async (req) => {
  try {
    const {articleId} = req.params;

    const article = await Article.findByIdAndRemove(articleId);

    const userId = article.owner;

    const user = await User.findById(userId);

    if(user) {
      const indx = user.articles.findIndex(article => article._id.toString() === articleId);
      user.articles = [...user.articles.slice(0, indx), ...user.articles.slice(indx + 1)];

      if(user.numberOfArticles > 0) {
        user.decrementNumberOfArticles();
      }

      await user.save();
    }
    
  } catch (err) {
    console.log(err);
    throw err;
  }
}