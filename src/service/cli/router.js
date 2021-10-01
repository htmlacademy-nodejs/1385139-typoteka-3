'use strict';

const {Router} = require(`express`);
const fs = require(`fs`).promises;

const FILENAME = `mocks.json`;

const router = new Router();

router.get(`/posts`, async (req, res) => {
  console.log('im here');
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent.toString());
    res.json(mocks);
  } catch (_err) {
    res.send([]);
  }
});

module.exports = router;

