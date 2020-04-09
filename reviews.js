const etl = require("etl");
const fs = require("fs");
const { connection } = require("./database.js");
const boolTransform = require("./boolTransform.js");

etl
  .file("./reviews.csv")
  .pipe(etl.csv())
  .pipe(
    etl.map(function (data) {
      this.push({
        product_id: data.product_id,
      });
    })
  )
  .pipe(etl.postgres.upsert(connection, "public", "products"));

etl
  .file("./reviews.csv")
  .pipe(etl.csv())
  .pipe(
    etl.map(function (data) {
      this.push({
        review_id: data.id,
        product_id: data.product_id,
      });
    })
  )
  .pipe(etl.postgres.upsert(connection, "public", "product_reviews"));

etl
  .file("./reviews.csv")
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
  .pipe(etl.postgres.upsert(connection, "public", "reviews"));
