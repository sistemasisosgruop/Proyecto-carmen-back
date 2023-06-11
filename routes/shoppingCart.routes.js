const express = require('express')
const passport = require('passport')
const ShopingCartsController = require('../controllers/shoppingCart.controllers')
require('../middlewares/auth.middleware')(passport)

const cartController = new ShopingCartsController()

const router = express.Router()

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  cartController.postShopingCart
)

module.exports = router
