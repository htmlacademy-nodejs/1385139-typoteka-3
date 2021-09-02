'use strict';

const fs = require(`fs`);
const {ExitCode} = require(`../../const`);
const {getRandomInt, getRandomDate, shuffle} = require(`../../utils`);

const DEFAULT_PUBLICATIONS_COUNT = 1;
const MAX_PUBLICATIONS_COUNT = 1000;
const MIN_SENTENCES_COUNT = 1;
const MAX_ANNOUNCE_SENTENCES_COUNT = 5;
const MAX_FULL_TEXT_SENTENCES_COUNT = 15;
const FILE_NAME = `mocks.json`;
const START_DATE = new Date(2021, 0, 1);
const END_DATE = new Date(2021, 6, 1);

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучшие рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const getRandomCategory = () => CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)];
const getText = (sentencesCount) => (
  shuffle(SENTENCES)
    .slice(MIN_SENTENCES_COUNT, getRandomInt(MIN_SENTENCES_COUNT + 1, sentencesCount))
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
  run(args) {
    console.log(args);
    const [count] = args;
    const countPublications = Number.parseInt(count, 10) || DEFAULT_PUBLICATIONS_COUNT;

    if (countPublications > MAX_PUBLICATIONS_COUNT) {
      console.info(`No more than ${MAX_PUBLICATIONS_COUNT} publications`);
      process.exit(ExitCode.error);
    }

    const content = JSON.stringify(generatePublications(countPublications));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  }
};
