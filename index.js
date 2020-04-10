const characteristicReviews = require("./char_reviews.js");
const characteristicNames = require("./chars_names.js");
const chars = require("./chars.js");

async function moveIt() {
  //CHARS.JS
  await chars.importCharacteristicNames();
  await chars.characteristicSet();
  await chars.productMetadata();
  //CHAR_NAMES.JS
  await characteristicNames();
  //CHAR_REVIEWS.JS
  await characteristicReviews();
}

moveIt();
