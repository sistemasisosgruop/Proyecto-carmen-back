const express = require('express')
const routesUsers = require('./users.routes')
const routesLogin = require('../auth/auth.routes')
const routesMessages = require('./messages.routes')
const routesDepartments = require('./departments.routes')
const routesRooms = require('./departmentRooms.routes')
const routesTours = require('./tours.routes')
const routesCoupons = require('./coupons.routes')
const routesReservations = require('./reservations.routes')
const routesShopingCart = require('./shoppingCart.routes')
const routesRoles = require('./roles.routes')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/auth', routesLogin)
  router.use('/users', routesUsers)
  router.use('/message', routesMessages)
  router.use('/departments', routesDepartments)
  router.use('/rooms', routesRooms)
  router.use('/tours', routesTours)
  router.use('/coupons', routesCoupons)
  router.use('/reservations', routesReservations)
  router.use('/cart', routesShopingCart)
  router.use('/roles', routesRoles)
}

module.exports = routerModels
