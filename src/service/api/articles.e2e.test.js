'use strict';

const express = require(`express`);
const request = require(`supertest`);

const articles = require(`./articles`);
const DataService = require(`../data-service/article`);
const CommentService = require("../data-service/comment");
const {HttpCode} = require("../../const");

const mockData = [
  {
    "title": "Рок — это протест",
    "id": "025j_Z",
    "createdDate": "1/15/2021, 7:35:58 PM",
    "announce": "Как начать действовать? Для начала просто соберитесь.",
    "fullText": "Достичь успеха помогут ежедневные повторения. Простые ежедневные упражнения помогут достичь успеха. Это один из лучших рок-музыкантов. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
    "category": [
      "Новые технологии"
    ],
    "comments": [
      {
        "id": "PhYJpM",
        "text": "Планируете записать видосик на эту тему? Хочу такую же футболку :-) Плюсую, но слишком много буквы! Это где ж такие красоты? Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Совсем немного..."
      },
      {
        "id": "DGMKqK",
        "text": "Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Планируете записать видосик на эту тему?"
      }
    ]
  },
  {
    "title": "Про обезьянку",
    "id": "0HfjUG",
    "createdDate": "5/21/2021, 12:22:14 PM",
    "announce": "Он написал больше 30 хитов.",
    "fullText": "Первая большая ёлка была установлена только в 1938 году. Золотое сечение — соотношение двух величин, гармоническая пропорция. Он написал больше 30 хитов. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Простые ежедневные упражнения помогут достичь успеха. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.",
    "category": [
      "Tips&Tricks",
      "Музыка",
      "Новые технологии"
    ],
    "comments": [
      {
        "id": "3TMHe4",
        "text": "Мне кажется или я уже читал это где-то? Планируете записать видосик на эту тему?"
      }
    ]
  },
  {
    "title": "Самый лучший музыкальный альбом этого года",
    "id": "0thR51",
    "createdDate": "2/12/2021, 5:08:27 AM",
    "announce": "Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Программировать не настолько сложно, как об этом говорят.",
    "fullText": "Простые ежедневные упражнения помогут достичь успеха. Он написал больше 30 хитов. Программировать не настолько сложно, как об этом говорят. Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Достичь успеха помогут ежедневные повторения. Это один из лучших рок-музыкантов. Собрать камни бесконечности легко, если вы прирожденный герой.",
    "category": [
      "Программирование",
      "IT",
      "Музыка"
    ],
    "comments": [
      {
        "id": "Dopymc",
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Плюсую, но слишком много буквы! Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?"
      },
      {
        "id": "-NrT6b",
        "text": "Совсем немного... Мне кажется или я уже читал это где-то? Плюсую, но слишком много буквы! Это где ж такие красоты?"
      },
      {
        "id": "uDZz5o",
        "text": "Плюсую, но слишком много буквы! Это где ж такие красоты?"
      },
      {
        "id": "RjStQB",
        "text": ""
      },
      {
        "id": "tIY7h_",
        "text": "Это где ж такие красоты? Плюсую, но слишком много буквы! Согласен с автором! Хочу такую же футболку :-) Мне кажется или я уже читал это где-то?"
      }
    ]
  },
  {
    "title": "Все на спорт",
    "id": "HeEb52",
    "createdDate": "2/17/2021, 8:38:45 PM",
    "announce": "Собрать камни бесконечности легко, если вы прирожденный герой. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Ёлки — это не просто красивое дерево. Это прочная древесина.",
    "fullText": "Ёлки — это не просто красивое дерево. Это прочная древесина. Из под его пера вышло 8 платиновых альбомов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.",
    "category": [
      "За жизнь",
      "Tips&Tricks",
      "Программирование",
      "Железо",
      "Без рамки",
      "Новые технологии",
      "Разное"
    ],
    "comments": [
      {
        "id": "aj4heR",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)"
      },
      {
        "id": "If-lZz",
        "text": "Совсем немного... Это где ж такие красоты? Плюсую, но слишком много буквы! Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Хочу такую же футболку :-)"
      },
      {
        "id": "ut9O-4",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Совсем немного..."
      },
      {
        "id": "9xg2Jy",
        "text": "Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Планируете записать видосик на эту тему? Это где ж такие красоты? Хочу такую же футболку :-)"
      },
      {
        "id": "gOl4qC",
        "text": "Планируете записать видосик на эту тему? Согласен с автором! Это где ж такие красоты? Плюсую, но слишком много буквы! Мне кажется или я уже читал это где-то? Совсем немного..."
      }
    ]
  },
  {
    "title": "Рок — это протест",
    "id": "05Fxhm",
    "createdDate": "5/16/2021, 1:23:33 AM",
    "announce": "Он написал больше 30 хитов. Ёлки — это не просто красивое дерево. Это прочная древесина. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.",
    "fullText": "Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете. Достичь успеха помогут ежедневные повторения. Как начать действовать? Для начала просто соберитесь. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Программировать не настолько сложно, как об этом говорят. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Золотое сечение — соотношение двух величин, гармоническая пропорция. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Собрать камни бесконечности легко, если вы прирожденный герой. Ёлки — это не просто красивое дерево. Это прочная древесина. Освоить вёрстку несложно. Возьмите новую книгу и закрепите все упражнения на практике.",
    "category": [
      "Программирование",
      "IT"
    ],
    "comments": [
      {
        "id": "rnC89d",
        "text": "Плюсую, но слишком много буквы!"
      },
      {
        "id": "yDB61t",
        "text": ""
      },
      {
        "id": "WS6sWP",
        "text": "Планируете записать видосик на эту тему? Согласен с автором! Мне кажется или я уже читал это где-то? Это где ж такие красоты? Хочу такую же футболку :-) Совсем немного... Плюсую, но слишком много буквы!"
      },
      {
        "id": "8o6SQ0",
        "text": "Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Плюсую, но слишком много буквы! Планируете записать видосик на эту тему? Мне кажется или я уже читал это где-то? Согласен с автором!"
      },
      {
        "id": "Zr3Bpg",
        "text": "Мне кажется или я уже читал это где-то? Хочу такую же футболку :-)"
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  articles(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));

  test(`First article's id equals "025j_Z"`, () => expect(response.body[0].id).toBe(`025j_Z`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/025j_Z`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Article's title is "Рок — это протест"`, () => expect(response.body.title).toBe(`Рок — это протест`));
});

describe(`API creates an article if data is valid`, () => {
  const newArticle = {
    category: `За жизнь`,
    createdDate: `10/25/2021, 22:33:58 PM`,
    title: `Британские ученые выяснили, что коты пахнут ванилью`,
    announce: `Британские ученые выяснили, что британские коты пахнут ванилью и иногда корицей`,
    fullText: `Нюхать макушечки котов полезно для здоровья. Британские ученые советуют делать это ежедневно`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles`)
      .send(newArticle);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article count is changed`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

describe(`API refuses to create an article if data is invalid`, () => {
  const newArticle = {
    category: `За жизнь`,
    createdDate: `10/25/2021, 22:33:58 PM`,
    title: `Британские ученые выяснили, что коты пахнут ванилью`,
    announce: `Британские ученые выяснили, что британские коты пахнут ванилью и иногда корицей`,
    fullText: `Нюхать макушечки котов полезно для здоровья. Британские ученые советуют делать это ежедневно`,
  };

  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
        .post(`/articles`)
        .send(badArticle)
        .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {
  const newArticle = {
    category: `За жизнь`,
    createdDate: `10/25/2021, 22:33:58 PM`,
    title: `Британские ученые выяснили, что коты пахнут ванилью`,
    announce: `Британские ученые выяснили, что британские коты пахнут ванилью и иногда корицей`,
    fullText: `Нюхать макушечки котов полезно для здоровья. Британские ученые советуют делать это ежедневно`,
  };

  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .put(`/articles/HeEb52`)
      .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));

  test(`Article is really changed`, () => request(app)
    .get(`/articles/HeEb52`)
    .expect((res) => expect(res.body.title).toBe(`Британские ученые выяснили, что коты пахнут ванилью`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  const app = createAPI();

  const validArticle = {
    category: `Это могла бы быть валидная статья о котиках`,
    title: `Но ее нельзя прочитать`,
    announce: `Очень жаль`,
    fullText: `Ведь такой статьи`,
    createdDate: `Не существует`,
  };

  return request(app)
    .put(`/articles/nonexistent`)
    .send(validArticle)
    .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  const app = createAPI();

  const invalidArticle = {
    category: `Эта статья могла бы быть о котиках`,
    title: `Но она невалидная и не увидит свет`,
    announce: `Очень жаль не почитать про котиков`,
    fullText: `Но тут нет поля createdDate`,
  };

  return request(app)
    .put(`/articles/nonexistent`)
    .send(invalidArticle)
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/0thR51`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns deleted article`, () => expect(response.body.id).toBe(`0thR51`));

  test(`Article count is 4 now`, () => request(app)
    .get(`/articles`)
    .expect((res) => expect(res.body.length).toBe(4))
  );
});

test(`API refuses to delete non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/nonexistent`)
    .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/articles/0thR51/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 5 comments`, () => expect(response.body.length).toBe(5));

  test(`First comment's id is "Dopymc"`, () => expect(response.body[0].id).toBe(`Dopymc`));
});


describe(`API creates a comment if data is valid`, () => {
  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/articles/0thR51/comments`)
      .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));

  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
    .get(`/articles/0thR51/comments`)
    .expect((res) => expect(res.body.length).toBe(6))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/nonexistent/comments`)
    .send({
      text: `Неважно`
    })
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  const app = createAPI();

  return request(app)
    .post(`/articles/0thR51/comments`)
    .send({})
    .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .delete(`/articles/0thR51/comments/uDZz5o`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`uDZz5o`));

  test(`Comments count is 3 now`, () => request(app)
    .get(`/articles/0thR51/comments`)
    .expect((res) => expect(res.body.length).toBe(4))
  );

});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/05Fxhm/comments/nonexistent`)
    .expect(HttpCode.NOT_FOUND);
});

test(`API refuses to delete a comment to non-existent article`, () => {
  const app = createAPI();

  return request(app)
    .delete(`/articles/nonexistent/comments/RjStQB`)
    .expect(HttpCode.NOT_FOUND);
});

