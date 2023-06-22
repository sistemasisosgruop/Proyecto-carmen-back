const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { Op } = require('sequelize')
const { v4: uuid4 } = require('uuid')
class CouponService {
  constructor() {}

  //? Get All Coupons with pagination
  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    options.distinct = true

    const coupons = await models.Coupons.findAndCountAll(options)
    return coupons
  }

  //? Get coupon by Id
  async getCouponOr404(couponId) {
    let coupon = await models.Coupons.findByPk(couponId)
    if (!coupon) throw new CustomError('Not found Coupon', 404, 'Not Found')
    return coupon
  }

  async createCoupon(couponData) {
    const transaction = await models.Coupons.sequelize.transaction()

    try {
      if (!couponData.room_id && !couponData.tour_id) {
        throw new Error(
          'You must enter a roomId or tourId in order to create a coupon.'
        )
      }
      const coupon = await models.Coupons.create(
        {
          id: uuid4(),
          coupon_code: couponData.coupon_code,
          discount: couponData.discount,
          room_id: couponData.room_id,
          tour_id: couponData.tour_id,
        },
        { transaction }
      )
      await transaction.commit()
      return coupon
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
      throw error
    }
  }
}

module.exports = CouponService
