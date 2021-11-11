const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

router.post('/', userController.createUser);

router.get('/:userId', userController.getUser);

router.put('/:userId', userController.updateUser);

router.delete('/:userId', userController.removeUser)

router.get('/:userId/articles', userController.getUserArticles);

module.exports = router;