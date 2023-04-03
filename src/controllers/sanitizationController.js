const { errorHandler } = require('../shared/errorHandler');

const eliminateDuplicates = (data) => {
  if (!Array.isArray(data)) {
    errorHandler('DATA_NOT_ARRAY');
  }
  const uniqueArray = [];
  const ids = [];
  data.forEach((item) => {
    const { _id, ...rest } = item;
    const stringified = JSON.stringify(rest);
    if (!ids.includes(stringified)) {
      ids.push(stringified);
      uniqueArray.push(item);
    }
  });
  return uniqueArray;
};

module.exports = {
  eliminateDuplicates,
};
