const etl = require("etl");
const fs = require("fs");
const { connection } = require("./database.js");

let ratings = {};
let characteristic = {};

let characteristicReviews = function () {
  console.log("*** STARTING FUNCTION characteristicReviews ***");

  return etl
    .file("./characteristic_reviews.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        // console.log(data);
        if (!ratings[data.characteristic_id]) {
          ratings[data.characteristic_id] = { count: 1, total: Number(data.value) };
        } else {
          ratings[data.characteristic_id].count++;
          ratings[data.characteristic_id].total += Number(data.value);
        }
      })
    )
    .promise()
    .then(() => {
      console.log("*** FINISHED READING CHARACTERISTIC_REVIEW.CSV AND COMPILING AVERAGE REVIEW DATA TO OBJECT***");
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      connection
        .query("SELECT * FROM characteristic")
        .then((result) => {
          for (let row of result.rows) {
            // console.log(row);
            characteristic[row.characteristic_id] = {
              name: [row.char_name_id],
              rating: ratings[row.characteristic_id],
            };
          }
        })
        .then(() => {
          console.log(
            "*** FINISHED QUERY FROM DATABASE [CHARACTERISTIC TABLE] AND ADDED RATING OBJECTS TO EACH ROW IN OBJECT ***"
          );
        })
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          etl
            .file("./characteristic_reviews.csv")
            .pipe(etl.csv())
            .pipe(
              etl.map(function (data) {
                if (characteristic[data.characteristic_id]) {
                  this.push({
                    characteristic_id: Number(data.characteristic_id),
                    char_name_id: Number(characteristic[data.characteristic_id].name),
                    value: JSON.stringify(characteristic[data.characteristic_id].rating),
                  });
                  delete characteristic[data.characteristic_id];
                }
              })
            )
            .pipe(etl.postgres.upsert(connection, "public", "characteristic"))
            .promise()
            .then(() => {
              console.log("*** FINISHED WRITING FULL DATASET TO DATABASE [CHARACTERISTIC TABLE] ***");
            })
            .catch((error) => console.error(error));
        });
    });
};

module.exports = characteristicReviews;
