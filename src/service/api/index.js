'use strict';

const {Router} = require(`express`);

const categories = require(`./categories`);
const articles = require(`./articles`);
const search = require(`./search`);

const getMockData = require(`./../lib/get-mock-data`);

const {
  CategoryService,
  ArticleService,
  SearchService,
  CommentService
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  categories(app, new CategoryService(mockData));
  articles(app, new ArticleService(mockData), new CommentService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;
