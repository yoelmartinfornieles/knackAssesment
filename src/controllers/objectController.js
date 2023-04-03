const getObjectNames = ([main, sub]) => ({
  main,
  sub,
});

function getObjectCountKeys(objectNames) {
  const mainCountKey = `${objectNames.main.slice(0, objectNames.main.length - 1)}_count`;
  const subCountKey = `${objectNames.sub.slice(0, objectNames.sub.length - 1)}_count`;
  return {
    main: mainCountKey,
    sub: subCountKey,
  };
}

module.exports = {
  getObjectNames, getObjectCountKeys,
};
