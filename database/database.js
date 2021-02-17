const knex = require("knex");

const database = knex({
    client : 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'bienes_aprehendidos'
    }
})

module.exports.database = database;