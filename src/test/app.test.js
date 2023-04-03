/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
const assert = require('assert').strict;

const { eliminateDuplicates } = require('../application/app');
const { loadFileAndParse, writeFile } = require('../controllers/fileController');
const { app } = require('../application/app');

const test1json = [
  {
    _id: '1',
    key1: {
      singular: '1',
    },
    key2: '2',
    subobject1: [
      {
        key1: '1',
      },
    ],
  },
  {
    _id: '2',
    key1: {
      singular: '1',
    },
    key2: '2',
    subobject1: [
      {
        key1: '1',
      },
    ],
  },
  {
    _id: '3',
    key1: {
      singular: '1',
    },
    key2: '2',
    subobject1: [
      {
        key1: '1',
      },
    ],
  },
];

describe('functional test', () => {
  it('should be able to load data from mock_application.json file, sanitize it and write it in the output folder as sanitized_mock_application.json', async () => {
    const filename = 'resources/mock_application.json';
    const paramsToSanitize = [['objects', 'fields'], ['scenes', 'views']];
    const outputFilename = 'sanitized_application.json';
    await app(filename, paramsToSanitize, outputFilename);

    const sanitizedJson = loadFileAndParse('output/sanitized_application.json');
    assert.deepStrictEqual(sanitizedJson.versions[0].objects.length, 5);
    assert.deepStrictEqual(sanitizedJson.object_count, 5);
    assert.deepStrictEqual(sanitizedJson.object_count, sanitizedJson.versions[0].objects.length);

    assert.deepStrictEqual(sanitizedJson.versions[0].scenes.length, 9);
    assert.deepStrictEqual(sanitizedJson.scene_count, 9);
    assert.deepStrictEqual(sanitizedJson.scene_count, sanitizedJson.versions[0].scenes.length);

    assert.deepStrictEqual(sanitizedJson.field_count, 31);

    assert.deepStrictEqual(sanitizedJson.view_count, 10);
  });
});

describe('integration test', () => {
  it('should be able to load data from a file and parse it', () => {
    const jsonFromFile1 = loadFileAndParse('src/test/resources/test1.json');
    assert.deepStrictEqual(jsonFromFile1, test1json);
  });
  it('should be able to remove duplicates from the data (being it an array of objects), excluding the _id field', () => {
    const jsonFromFile1 = loadFileAndParse('src/test/resources/test1.json');
    assert.deepStrictEqual(eliminateDuplicates(jsonFromFile1).length, 1);
  });
  it('should be able to write the result to a json file', () => {
    writeFile('testOutput.json', test1json);
    const jsonFromFile = loadFileAndParse('output/testOutput.json');
    assert.deepStrictEqual(jsonFromFile, test1json);
  });
});

describe('loadFileAndParse', () => {
  it('should fail if the file does not exist', () => {
    const expectedError = new Error('The file does not exist, check the path and try again');
    assert.rejects(() => {
      loadFileAndParse('src/test/resources/doesNotExist.json');
    }, expectedError);
  });
  it('should fail if the file doesnt contain a valid json file', () => {
    const expectedError = new Error('The file does not contain a valid json');
    assert.rejects(() => {
      loadFileAndParse('src/test/resources/test2.json');
    }, expectedError);
  });
  it('should fail if the filename is not a string', () => {
    const expectedError = new Error('The data is not a string');
    assert.rejects(() => {
      loadFileAndParse([['src/test/resources/test2.json']]);
    }, expectedError);
  });
});

describe('eliminateDuplicates', () => {
  it('should return an empty array if the data is empty', () => {
    const emptyArray = [];
    assert.deepStrictEqual(eliminateDuplicates(emptyArray), emptyArray);
  });
  it('should return the same array if the keys of the objects are the same but the values are different', () => {
    const jsonFromFile3 = loadFileAndParse('src/test/resources/test3.json');
    assert.deepStrictEqual(eliminateDuplicates(jsonFromFile3).length, 3);
  });
  it('should return the same array if the values of the objects are the same but the keys are different', () => {
    const jsonFromFile4 = loadFileAndParse('src/test/resources/test3.json');
    assert.deepStrictEqual(eliminateDuplicates(jsonFromFile4).length, 3);
  });
  it('should fail if data is not an array of objects', () => {
    const expectedError = new Error('The data is not an array');
    assert.rejects(() => {
      eliminateDuplicates({ key1: 'value1' });
    }, expectedError);
  });
});

describe('writeFile', () => {
  it('should fail if the filename is not a string', () => {
    const expectedError = new Error('The data is not a string');
    assert.rejects(() => {
      writeFile([['src/test/resources/test2.json']], {});
    }, expectedError);
  });
  it('should fail if the data is not an object', () => {
    const expectedError = new Error('The data is not an object');
    assert.rejects(() => {
      writeFile('src/test/resources/test2.json', ['data']);
    }, expectedError);
  });
});
