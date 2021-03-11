const knex = require("knex");

const database = knex({
  client: "mysql",
  connection: {
    host: "10.2.11.7",
    user: "aeronaval",
    password: "123456",
    database: "bienes_aprehendidos",
  },
});

module.exports.database = database;
