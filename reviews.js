const etl = require("etl");
const { connection } = require("./database.js");
const boolTransform = require("./boolTransform.js");

let products = function () {
  console.log("*** STARTING FUNCTION products ***");
  return etl
    .file("./data/reviews.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        this.push({
          product_id: data.product_id,
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "products"))
    .promise()
    .then(() => {
      console.log("*** FINISHED WRITING PRODUCT_ID'S TO THE DATABASE [PRODUCTS TABLE] ***");
    })
    .catch((error) => {
      console.error(error);
    });
};

let productReviews = function () {
  console.log("*** STARTING FUNCTION productReviews ***");
  return etl
    .file("./data/reviews.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        this.push({
          review_id: data.id,
          product_id: data.product_id,
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "product_reviews"))
    .promise()
    .then(() => {
      console.log("*** FINISHED WRITING REVIEW_ID AND PRODUCT_ID TO DATABASE [PRODUCT_REVIEWS TABLE] ***");
    })
    .catch((error) => {
      console.error(error);
    });
};

let reviews = function () {
  console.log("*** STARTING FUNCTION reviews ***");
  return etl
    .file("./data/reviews.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        this.push({
          review_id: data.id,
          rating: data.rating,
          summary: data.summary,
          response: data.response,
          body: data.body,
          reviewer_name: data.reviewer_name,
          reviewer_email: data.reviewer_email,
          helpfulness: data.helpfulness,
          reported: boolTransform(data.reported),
          date: data.date,
          recommend: boolTransform(data.recommend),
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "reviews"))
    .promise()
    .then(() => {
      console.log("*** FINISHED WRITING ALL REVIEW FEILDS TO DATABASE [REVIEWS TABLE] ***");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports.products = products;
module.exports.productReviews = productReviews;
module.exports.reviews = reviews;
