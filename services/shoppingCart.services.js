const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

class ShopingCartsService {
  constructor() {}

  async addProductsToCart(
    userId,
    reservationRoomId,
    reservationTourId,
    quantity,
    paymentMethod
  ) {
    const transaction = await models.Shoping_Cart.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if (!user) {
        throw new Error('User does not exist')
      }

      console.log('ROOMID: ', reservationRoomId)
      console.log('TOURID: ', reservationTourId)

      const reservationRoom = await models.Reservation_Rooms.findOne({
        where: {
          id: reservationRoomId,
        },
      })

      const reservationTour = await models.Reservation_Tours.findOne({
        where: {
          id: reservationTourId,
        },
      })

      console.log('ROOM: ', reservationRoom)
      console.log('TOUR: ', reservationTour)

      if (reservationRoom || reservationTour) {
        const products = await models.User_Products.create(
          {
            id: uuid4(),
            user_id: userId,
            room_id: reservationRoom.dataValues.room_id,
            tour: reservationTour.dataValues.tour_id,
          },
          { transaction }
        )
        return products
      }

      const userProduct = await this.findUserProductsByUser(userId)
      console.log('USER PRODUCTS: ', userProduct)
      const cart = await models.Shoping_Cart.create()
      await transaction.commit()
      return cart
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async findUserProductsByUser(userId) {
    const product = await models.User_Products.findOne({
      where: {
        user_id: userId,
      },
    })
    return product
  }
}

module.exports = ShopingCartsService
