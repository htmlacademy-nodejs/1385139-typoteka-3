'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = [];

const getMockData = async () => {
  if (data.length > 0) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent.toString());
  } catch (err) {
    console.error(err);
    return err;
  }

  return data;
};

module.exports = getMockData;
