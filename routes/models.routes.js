const express = require('express')
const routesUsers = require('./users.routes')
const routesLogin = require('../auth/auth.routes')
const routesMessages = require('./messages.routes')
const routesRooms = require('./rooms.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', routesLogin)
  router.use('/users', routesUsers)
  router.use('/message', routesMessages)
  router.use('/rooms', routesRooms)

}

module.exports = routerModels
