const etl = require("etl");
const fs = require("fs");
const { connection } = require("./database.js");

let characteristics = {};

connection.query("SELECT * FROM characteristic_names", (error, result) => {
  error ? error.stack : console.log(result.rows);
  for (let row of result.rows) {
    characteristics[row.name] = row.char_name_id;
  }

  etl
    .file("./characteristics.csv")
    .pipe(etl.csv())
    .pipe(
      etl.map(function (data) {
        this.push({
          characteristic_id: data.id,
          char_name_id: characteristics[data.name],
        });
      })
    )
    .pipe(etl.postgres.upsert(connection, "public", "characteristic"));
});
