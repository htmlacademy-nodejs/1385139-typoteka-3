'use strict';

const {HttpCode} = require(`../../const`);

const articleKeys = [`title`, `createdDate`, `announce`, `fullText`, `category`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key) && newArticle[key].length);

  if (!keysExists) {
    return res
      .status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
