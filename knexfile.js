// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://peodzzpi:Bt26r3XYTIzcb09VlwSuYxHK_O8HzUkb@isilo.db.elephantsql.com:5432/peodzzpi'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
