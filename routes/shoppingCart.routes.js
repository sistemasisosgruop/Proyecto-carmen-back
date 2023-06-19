const express = require('express')
const passport = require('passport')
const ShopingCartsController = require('../controllers/shoppingCart.controllers')
require('../libs/passport')(passport)
const routesPayment = require('./payment.routes')

const cartController = new ShopingCartsController()

const router = express.Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  cartController.postShopingCart
)

router.use('/', routesPayment)

module.exports = router
