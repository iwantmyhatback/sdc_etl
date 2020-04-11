const etl = require("etl");
const { connection } = require("./database.js");

let photos = {};

let reviewPhotos = function () {
  console.log("*** STARTING FUNCTION reviewPhotos ***");

  return etl
    .file("./data/reviews_photos.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        if (!photos[data.review_id]) {
          photos[data.review_id] = { photos: { [data.id]: data.url } };
        } else {
          photos[data.review_id].photos[data.id] = data.url;
        }
        // console.log(photos[data.review_id]);
        this.push({
          review_id: Number(data.review_id),
          photos: photos[data.review_id].photos,
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "photos"))
    .promise()
    .then(() => {
      console.log("*** FINISHED CONSOLIDATING PHOTOS FROM REVIEWS_PHOTOS.CSV TO JS OBJECT***");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = reviewPhotos;
