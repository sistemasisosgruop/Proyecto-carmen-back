const models = require('../database/models')
const UsersService = require('./users.services')
const userService = new UsersService()
const RoomsService = require('./rooms.services')
const { CustomError } = require('../utils/custom-error')
const { Op } = require('sequelize')
const roomService = new RoomsService()

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

  async createCoupon(userId, couponData) {
    const transaction = await models.Coupons.sequelize.transaction()
    const user = await userService.getUserOr404(userId)
    try {
      if (user.dataValues.role_id !== 1) {
        throw new Error('Only admins can create New Coupons')
      }

      const room = await roomService.getRoomOr404(couponData.room_id)
      if (!room) {
        throw new Error('Room not finded.')
      }

      const coupon = await models.Coupons.create(
        {
          coupon_code: couponData.coupon_code,
          discount: couponData.discount,
          room_id: room.id,
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
