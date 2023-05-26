const { getPagination, getPagingData } = require('../utils/pagination')
const CouponsService = require('../services/coupons.services')
const couponService = new CouponsService()

class CouponController {
  constructor() {}

  //? Get All Coupons with Pagination
async getAllCoupons (req, res) {
  try {
    let query = req.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let coupons = await couponService.findAndCount(query)
    const results = getPagingData(coupons, page, limit)
    return res.json({ results: results })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

//? Get coupon by Id
async getCoupon (req, res) {
  try {
    let { couponId } = req.params
    let coupon = await couponService.getCouponOr404(couponId)
    return res.json({ results: coupon })
  } catch (error) {
    return res.status(404).json({ message: 'Invalid ID' })
  }
}


  async postCoupon(req, res) {
    const userId  = req.user.id
    const { coupon_code, discount, room_id, tour_id } = req.body
    
    try {
      const couponData = {
        coupon_code: coupon_code,
        discount,
        room_id: room_id,
        tour_id: tour_id,
      }

      const coupon = await couponService.createCoupon(userId, couponData)
      res.status(201).json({ message: 'Coupon created succesfully', coupon })
    } catch (error) {
      res.status(500).json({ message: error.message, fields: {
        coupon_code: 'String', 
        discount: 'Float', 
        room_id: 'UUID', 
        tour_id: 'UUID'
      } })
    }
  }
}

module.exports = CouponController
