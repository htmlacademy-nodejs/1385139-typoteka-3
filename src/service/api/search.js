'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../const`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res
        .status(HttpCode.BAD_REQUEST)
        .json([]);
    }

    const searchResults = service.findAll(query);
    const searchStatus = searchResults.length > 0
      ? HttpCode.OK
      : HttpCode.NOT_FOUND;

    return res
      .status(searchStatus)
      .json(searchResults);
  });
};
