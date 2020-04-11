const etl = require("etl");
const { connection } = require("./database.js");

let nameId = 1;
let passedName = {};

let characteristicNames = function () {
  console.log("*** STARTING FUNCTION characteristicNames ***");
  return etl
    .file("./data/characteristics.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        if (!passedName[data.name]) {
          passedName[data.name] = nameId;
          this.push({
            char_name_id: nameId++,
            name: data.name,
          });
        }
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "characteristic_names"))
    .promise()
    .then(() => {
      console.log(
        "*** FINISHED CONSOLIDATING CHARACTERISTICS INTO ID:NAME FROM CHARACTERISTICS.CSV AND WROTE TO DATABASE[CHARACTERISTIC_NAMES TABLE] ***"
      );
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = characteristicNames;
