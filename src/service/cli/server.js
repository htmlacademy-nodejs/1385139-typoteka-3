'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {HttpCode} = require(`../../const`);
const router = require(`./router`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(`/`, router);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

app.use(express.json());

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.bgRed.black(`Ошибка при создании сервера:`, err));
      }

      return console.info(chalk.bgGreen.black(`Сервер ожидает соединений на порту ${port}`));
    });
  }
};
