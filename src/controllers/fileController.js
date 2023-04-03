/* eslint-disable no-constant-condition */
// eslint-disable-next-line import/no-extraneous-dependencies
const fs = require('fs');
const path = require('path');
const { errorHandler } = require('../shared/errorHandler');

const loadFileAndParse = (inputFilename) => {
  if (!typeof inputFilename === 'string') {
    errorHandler('DATA_NOT_STRING');
  }
  let file;
  let json;
  try {
    file = fs.readFileSync(path.resolve(__dirname, `../../${inputFilename}`));
  } catch (e) {
    errorHandler('FILE_DOES_NOT_EXIST');
  }
  try {
    json = JSON.parse(file);
  } catch (e) {
    errorHandler('NOT_VALID_JSON');
  }
  return json;
};

const writeFile = (outputFilename, data) => {
  if (!typeof outputFilename === 'string') {
    errorHandler('DATA_NOT_STRING');
  }
  if (!typeof data === 'object') {
    errorHandler('DATA_NOT_OBJECT');
  }
  try {
    const dataString = JSON.stringify(data, null, 4);
    fs.writeFileSync(path.resolve(__dirname, `../../output/${outputFilename}`), dataString);
  } catch (e) {
    errorHandler('FILE_WRITE_ERROR');
  }
};

module.exports = {
  loadFileAndParse, writeFile,
};
