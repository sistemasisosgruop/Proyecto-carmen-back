const express = require('express')
const routesUsers = require('./users.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
}

module.exports = routerModels
