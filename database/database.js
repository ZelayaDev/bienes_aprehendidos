const knex = require("knex");

const host = process.env.HOST_BIENES;
const user = process.env.USER_BIENES;
const password = process.env.PASSWORD_BIENES;
const dabataseName = process.env.DATABASE_BIENES;

const database = knex({
  client: "mysql",
  connection: {
    host: host,
    user: user,
    password: password,
    database: dabataseName,
  },
});

module.exports.database = database;
