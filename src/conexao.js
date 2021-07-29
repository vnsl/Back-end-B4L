const parse = require('pg-connection-string').parse;

const pgconfig = parse(process.env.DB_DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

// Configurações Heroku
const knex = require('knex')({
    client: 'pg',
    connection: {
        connection: pgconfig,
    }
});

// Configurações DB local
// const knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         user: 'postgres',
//         database: 'cubos_food',
//         password: '123456',
//     }
// });

module.exports = knex;