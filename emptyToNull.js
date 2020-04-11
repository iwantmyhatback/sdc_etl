let emptyToNull = function (data) {
  if (data === '') {
    return null;
  } else {
    return data;
  }
};

module.exports = emptyToNull;
