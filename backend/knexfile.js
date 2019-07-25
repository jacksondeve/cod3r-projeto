// Update with your config settings.

const {db} = require('./.env')

module.exports = {

    client: 'mysql',
    connection: {
      database: 'backend',
      user:     'mysql',
      password: 'jkn'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
};
