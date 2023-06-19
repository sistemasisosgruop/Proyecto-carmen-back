const express = require('express')
const router = express.Router()
const passport = require('passport')
require('../libs/passport')(passport)

const RoleAuth = require('../middlewares/auth.middleware')
const CouponsController = require('../controllers/coupons.controllers')
const couponController = new CouponsController()
const roleAuth = new RoleAuth()

router.get('/', couponController.getAllCoupons)
router.post(
  '/',
  [passport.authenticate('jwt', { session: false }), roleAuth.isAdmin],
  couponController.postCoupon
)

router.get('/:couponId', couponController.getCoupon)

module.exports = router
