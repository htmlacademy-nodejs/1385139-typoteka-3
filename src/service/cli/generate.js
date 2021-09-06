'use strict';

const fs = require(`fs`).promises;
const {ExitCode} = require(`../../const`);
const {getRandomInt, getRandomDate, shuffle} = require(`../../utils`);
const chalk = require(`chalk`);

const DEFAULT_PUBLICATIONS_COUNT = 1;
const MAX_PUBLICATIONS_COUNT = 1000;
const MIN_SENTENCES_COUNT = 1;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MAX_FULL_TEXT_SENTENCES_COUNT = 15;
const FILE_NAME = `mocks.json`;
const START_DATE = new Date(2021, 0, 1);
const END_DATE = new Date(2021, 6, 1);

const getRandomCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
const getText = (sentencesCount) => (
  shuffle(SENTENCES)
    .slice(MIN_SENTENCES_COUNT, getRandomInt(MIN_SENTENCES_COUNT + 1, sentencesCount - 1))
    .join(` `)
);

const generatePublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(START_DATE, END_DATE).toLocaleString(),
    announce: getText(MAX_ANNOUNCE_SENTENCES_COUNT),
    fullText: getText(MAX_FULL_TEXT_SENTENCES_COUNT),
    category: [...new Set(Array(getRandomInt(1, CATEGORIES.length)).fill({}).map(getRandomCategory))],
  }))
);


module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countPublications = Number.parseInt(count, 10) || DEFAULT_PUBLICATIONS_COUNT;

    if (countPublications > MAX_PUBLICATIONS_COUNT) {
      console.info(chalk.red(`No more than ${MAX_PUBLICATIONS_COUNT} publications`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePublications(countPublications));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
