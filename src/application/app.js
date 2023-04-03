/* eslint-disable no-param-reassign */
/* eslint-disable import/extensions */
const { errorHandler } = require('../shared/errorHandler');
const { writeFile, loadFileAndParse } = require('../controllers/fileController');
const { eliminateDuplicates } = require('../controllers/sanitizationController');
const { getObjectNames, getObjectCountKeys } = require('../controllers/objectController');

const cleanData = (mockApplication, params) => {
  try {
    const objectNames = getObjectNames(params);
    const countKeys = getObjectCountKeys(objectNames);

    const elementsToClean = mockApplication.versions[0][objectNames.main];

    const cleanElements = eliminateDuplicates(elementsToClean);
    cleanElements.forEach((cleanElement) => {
      const subElementsToClean = cleanElement[objectNames.sub];
      const cleanSubElements = eliminateDuplicates(subElementsToClean);
      // eslint-disable-next-line no-param-reassign
      cleanElement[objectNames.sub] = cleanSubElements;
    });
    mockApplication.versions[0][objectNames.main] = cleanElements;

    mockApplication[countKeys.main] = cleanElements.length;
    // eslint-disable-next-line max-len
    mockApplication[countKeys.sub] = cleanElements.reduce((total, element) => total + element[objectNames.sub].length, 0);
  } catch (e) {
    errorHandler('FAILED_TO_ELIMINATE_DUPLICATES');
  } return mockApplication;
};

async function app(filename, paramsToSanitize, outputFilename) {
  const jsonToSanitize = loadFileAndParse(filename);
  const cleanedMockApp = paramsToSanitize.reduce(
    (data, params) => cleanData(data, params),
    jsonToSanitize,
  );
  writeFile(outputFilename, cleanedMockApp);
}

module.exports = {
  app, eliminateDuplicates,
};
