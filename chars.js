const etl = require("etl");
const { connection } = require("./database.js");
const boolTransform = require("./boolTransform.js");

let characteristics = {};

let importCharacteristicNames = function () {
  console.log("*** STARTING FUNCTION importCharacteristicNames ***");
  return connection
    .query("SELECT * FROM characteristic_names")
    .then((result) => {
      for (let row of result.rows) {
        characteristics[row.name] = row.char_name_id;
      }
    })
    .then(() => {
      etl
        .file("./data/characteristics.csv")
        .pipe(etl.csv())
        .pipe(
          etl.map(function (data) {
            this.push({
              characteristic_id: data.id,
              char_name_id: characteristics[data.name],
            });
          })
        )
        .pipe(etl.postgres.upsert(connection, "public", "characteristic"))
        .promise()
        .then(() => {
          console.log(
            "*** FINISHED WRITING CHAR_ID & CHAR_NAME_ID FROM CHARACTERISTICS.CSV TO DATABASE [CHARACTERISTIC TABLE]... AWAITING RATING FEILD ***"
          );
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

let characteristicSet = function () {
  console.log("*** STARTING FUNCTION characteristicSet ***");
  return etl
    .file("./data/characteristics.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        this.push({
          characteristic_id: data.id,
          product_id: data.product_id,
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "characteristic_set"))
    .promise()
    .then(() => {
      console.log(
        "*** FINISHED WRITING CHARACTERISTIC_ID AND PRODUCT_ID FROM CHARACTERISTICS.CSV TO DATABASE [CHARACTERISTIC_SET TABLE] ***"
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

let ratings = {};
let recommended = {};

let productMetadata = function () {
  console.log("*** STARTING FUNCTION productMetadata ***");
  return connection
    .query("SELECT * FROM products")
    .then((result) => {
      for (let row of result.rows) {
        ratings[row.product_id] = 0;
      }
    })
    .then(() => {
      console.log("*** FINISHED READING ALL PRODUCT_ID DATA FROM DATABASE [PRODUCTS TABLE] ***");
    })
    .catch((error) => {
      console.error(error);
    })
    .then(() => {
      etl
        .file("./data/reviews.csv")
        .pipe(etl.csv())
        .pipe(
          etl.map(function (data) {
            // TRANSFORM INDIVIDUAL RATINGS INTO COMBINED RATING OBJECT
            if (!ratings[data.product_id]) {
              ratings[data.product_id] = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
            } else {
              ratings[data.product_id][data.rating]++;
            }
            // TRANSFORM INDIVIDUAL RECOMMENDED STATUSES INTO COMBINED RECOMMENDED OBJECT
            if (!recommended[data.product_id]) {
              recommended[data.product_id] = { 0: 0, 1: 0 };
            } else {
              recommended[data.product_id][boolTransform(data.recommend)]++;
            }

            this.push({
              product_id: data.product_id,
              ratings: JSON.stringify(ratings[data.product_id]),
              recommended: JSON.stringify(recommended[data.product_id]),
            });
          })
        )
        .pipe(etl.postgres.upsert(connection, "public", "product_metadata"))
        .promise()
        .then(() => {
          console.log(
            "*** FINISHED WRITING PRODUCT_ID, RATINGS, & RECOMMENDED TO DATABASE [PRODUCTMETADATA TABLE] ***"
          );
        })
        .catch((error) => {
          console.error(error);
        });
    });
};

module.exports.importCharacteristicNames = importCharacteristicNames;
module.exports.characteristicSet = characteristicSet;
module.exports.productMetadata = productMetadata;
