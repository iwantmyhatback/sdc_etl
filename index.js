const characteristicReviews = require('./char_reviews.js');
const characteristicNames = require('./chars_names.js');
const chars = require('./chars.js');
const reviews = require('./reviews.js');
const reviewPhotos = require('./review_photos.js');

async function iLikeToMoveItMoveIt() {
  console.log('Starting ETL: ', Date());
  // REVIEWS.JS
  await reviews.products();
  await reviews.productReviews();
  await reviews.reviews();
  //CHAR_NAMES.JS
  await characteristicNames();
  //CHARS.JS
  await chars.importCharacteristicNames();
  await chars.characteristicSet();
  await chars.productMetadata();
  //CHAR_REVIEWS.JS
  await characteristicReviews();
  //REVIEW_PHOTOS.JS
  await reviewPhotos();
  console.log('Ended ETL: ', Date());
}

iLikeToMoveItMoveIt();
