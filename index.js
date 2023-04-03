/* eslint-disable no-console */
const { app } = require('./src/application/app');

const filename = 'resources/mock_application.json';
const paramsToSanitize = [['objects', 'fields'], ['scenes', 'views']];
const outputFilename = 'sanitized_application.json';

console.log('Starting application...');
app(filename, paramsToSanitize, outputFilename)
  .then(() => console.log('sanitized_application.json created'))
  .catch((err) => console.error(err));
