/* eslint-disable no-undef */
const { test } = require('./app');

const filename = '/resources/mock_application.json';

describe('integration test', () => {
  it('run', async () => {
    const duplicatedParams = [
      ['objects', 'fields'],
      ['scenes', 'views'],
    ];
    await test(filename, duplicatedParams);
  });
});
