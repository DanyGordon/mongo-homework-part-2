const userService = require('../services/user');
const {getCurrentUrl} = require('../config/util');

async function createUser(req, res, next) {
  try {
    const id = await userService.createNewUser(req);
    res.location(getCurrentUrl(req) + id);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const user = await userService.findUserById(req);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const updatedUser = await userService.updateUser(req);
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

async function removeUser(req, res, next) {
  try {
    await userService.removeUserById(req);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

async function getUserArticles(req, res, next) {
  try {
    const articles = await userService.getUserArticles(req);
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  getUser,
  updateUser,
  removeUser,
  getUserArticles
};