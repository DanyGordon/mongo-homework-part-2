const express = require('express');
const router = express.Router();

const articleController = require('../controllers/article');

router.get('/', articleController.getAllArticles);

router.post('/', articleController.createArticle);

router.put('/:articleId', articleController.updateArticle);

router.delete('/:articleId', articleController.removeArticle);

module.exports = router;