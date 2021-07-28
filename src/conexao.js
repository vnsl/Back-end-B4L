const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        database: 'cubos_food',
        password: '123456',
    }
});

module.exports = knex;