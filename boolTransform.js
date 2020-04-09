let boolTransform = function (recommend) {
  if (recommend === "true") {
    return 1;
  } else if (recommend === "false") {
    return 0;
  } else {
    return recommend;
  }
};

module.exports = boolTransform;
