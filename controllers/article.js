const articleService = require('../services/article');

async function createArticle(req, res, next) {
  try {
    await articleService.createNewArticle(req);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function getAllArticles(req, res, next) {
  try {
    const articles = await articleService.searchArticles(req);
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}

async function updateArticle(req, res, next) {
  try {
    const updated = await articleService.updateArticle(req);
    res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
}

async function removeArticle(req, res, next) {
  try {
    await articleService.removeArticle(req);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  updateArticle,
  removeArticle,
};