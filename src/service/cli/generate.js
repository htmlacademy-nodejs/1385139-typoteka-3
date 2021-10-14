'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {ExitCode, MAX_ID_LENGTH} = require(`../../const`);
const {getRandomInt, getRandomDate, shuffle} = require(`../../utils`);

const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const DEFAULT_PUBLICATIONS_COUNT = 1;
const MAX_PUBLICATIONS_COUNT = 1000;
const MIN_SENTENCES_COUNT = 1;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MAX_FULL_TEXT_SENTENCES_COUNT = 15;
const FILE_NAME = `mocks.json`;
const START_DATE = new Date(2021, 0, 1);
const END_DATE = new Date(2021, 6, 1);
const MAX_COMMENTS_AMOUNT = 5;
const MIN_COMMENT_LENGTH = 20;
const MAX_COMMENT_LENGTH = 250;

const getRandomCategory = (categories) => categories[getRandomInt(0, categories.length - 1)];

const getText = (sentencesCount, sentences) => (
  shuffle(sentences)
    .slice(MIN_SENTENCES_COUNT, getRandomInt(MIN_SENTENCES_COUNT + 1, sentencesCount - 1))
    .join(` `)
);

const getCommentText = (commentLength, comments) => {
  const shuffledComments = shuffle(comments);
  let result = [];
  let check = [];
  for (let i = 1; i <= shuffledComments.length; i += 1) {
    check.push(shuffledComments[i]);
    if (check.join(` `).length <= commentLength) {
      result.push(shuffledComments[i]);
    }
  }

  return result.join(` `);
};

const getRandomComment = (comments) => ({
  id: nanoid(MAX_ID_LENGTH),
  text: getCommentText(getRandomInt(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH), comments),
});

const generatePublications = (
    count,
    titles,
    sentences,
    categories,
    comments
) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    id: nanoid(MAX_ID_LENGTH),
    createdDate: getRandomDate(START_DATE, END_DATE).toLocaleString(),
    announce: getText(MAX_ANNOUNCE_SENTENCES_COUNT, sentences),
    fullText: getText(MAX_FULL_TEXT_SENTENCES_COUNT, sentences),
    category: [...new Set(Array(getRandomInt(1, categories.length)).fill({}).map(() => getRandomCategory(categories)))],
    comments: [...new Set(Array(getRandomInt(1, MAX_COMMENTS_AMOUNT)).fill({}).map(() => getRandomComment(comments)))],
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);

    const [count] = args;
    const countPublications = parseInt(count, 10) || DEFAULT_PUBLICATIONS_COUNT;

    if (countPublications > MAX_PUBLICATIONS_COUNT) {
      console.info(chalk.red(`No more than ${MAX_PUBLICATIONS_COUNT} publications`));
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePublications(countPublications, titles, sentences, categories, comments));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  }
};
