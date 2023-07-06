'use strict'
require('dotenv').config()
module.exports = {
  development: {
    use_env_variable: 'DATABASE_URI_DEV',
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: 'UTC'
  },
  test: {
    use_env_variable: process.env.DATABASE_URI_TEST,
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
    dialectOptions: {
      useUTC: true,
    },
    timezone: 'UTC',
  },
  production: {
    use_env_variable: process.env.DATABASE_URI_PROD,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      useUTC: true,
    },
    define: {
      timestamps: true,
      underscored: false,
      underscoredAll: false,
    },
    timezone: 'UTC',
  },
}
