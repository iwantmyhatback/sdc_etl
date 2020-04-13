let emptyToNull = function (data) {
  if (data === '') {
    return null;
  } else if (data === 'null') {
    return null;
  } else {
    return data;
  }
};

module.exports = emptyToNull;
