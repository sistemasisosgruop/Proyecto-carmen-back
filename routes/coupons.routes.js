const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middlewares/auth.middleware')(passport)

const CouponsController = require('../controllers/coupons.controllers');
const couponController = new CouponsController();

router.get('/', couponController.getAllCoupons);
router.post('/', passport.authenticate('jwt', {session: false}), couponController.postCoupon);

router.get('/:couponId', couponController.getCoupon);

module.exports = router;
