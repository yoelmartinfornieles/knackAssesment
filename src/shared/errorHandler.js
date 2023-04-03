/* eslint-disable linebreak-style */
const errorList = require('./errorList');

const errorHandler = (error) => {
  if (errorList[error]) {
    throw new Error(errorList[error].message);
  } else {
    throw new Error(`Unhandled error: ${error}`);
  }
};

module.exports = { errorHandler };
