const express = require('express')
const passport = require('passport')
const ShopingCartsController = require('../controllers/shoppingCart.controllers')
require('../libs/passport')(passport)
const routesPayment = require('./payment.routes')
const RoleAuth = require('../middlewares/auth.middleware')

const roleAuth = new RoleAuth()
const cartController = new ShopingCartsController()

const router = express.Router()

router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  cartController.postShopingCart
)

router.use('/', routesPayment)

module.exports = router
