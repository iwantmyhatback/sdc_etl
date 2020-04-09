const etl = require("etl");
const fs = require("fs");
const { connection } = require("./database.js");

let nameId = 1;
let passedName = {};

etl
  .file("./characteristics.csv")
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
  .pipe(etl.postgres.upsert(connection, "public", "characteristic_names"));
