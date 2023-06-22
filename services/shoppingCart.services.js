const models = require('../database/models')
const { v4: uuid4 } = require('uuid')
class ShopingCartsService {
  constructor() {}

  async addProductsToCart(userId, cartData) {
    // Iniciar una transacción
    const transacción = await models.Shoping_Cart.sequelize.transaction()

    try {
      // Buscar o crear el carrito del usuario
      let cart = await models.Shoping_Cart.findOrCreate({
        where: { id: uuid4(), user_id: userId },
        defaults: { user_id: userId },
      })

      // Agregar la habitación al carrito si se proporciona un ID de habitación
      // Agregar la habitación al carrito si se proporciona un ID de habitación
      if (cartData.reservationRoomId) {
        const reservationRoom = await models.Reservation_Rooms.findOne({
          where: {
            id: cartData.reservationRoomId,
          },
        })
        if (!reservationRoom) {
          throw new Error(`Room reservation for user ${userId} not found`)
        }

        console.log(userId)
        // Crear o actualizar el elemento de carrito para la habitación
        await models.Shoping_Cart.findOrCreate({
          where: {
            id: cart.dataValues.id,
            room_id: cartData.reservationRoomId,
          },
          defaults: {
            id: cart.dataValues.id,
            room_id: cartData.reservationRoomId,
            quantity: cartData.quantity || 1,
          },
        })
      }

      console.log(cart)
      // Agregar el tour al carrito si se proporciona un ID de tour
      if (cartData.reservationTourId) {
        const reservationTour = await models.Reservation_Tours.findOne({
          where: {
            tour_id: cartData.reservationTourId,
          },
        })
        if (!reservationTour) {
          throw new Error(`Tour reservation for user ${userId} not found`)
        }

        // Crear o actualizar el elemento de carrito para el tour
        await models.Shoping_Cart.findOrCreate({
          where: {
            id: cart.dataValues.id,
            tour_id: cartData.reservationTourId,
          },
          defaults: {
            id: cart.dataValues.id,
            tour_id: cartData.reservationTourId,
            quantity: cartData.quantity || 1,
          },
        })
      }

      // Confirmar la transacción
      await transacción.commit()

      // Devolver el carrito actualizado
      cart = await models.Shoping_Cart.findByPk(cart.id, {
        include: [
          { model: models.Reservation_Rooms, as: 'RoomItems' },
          { model: models.Reservation_Tours, as: 'TourItems' },
        ],
      })
      console.log(cart)
      return cart
    } catch (error) {
      // Revertir la transacción en caso de error
      await transacción.rollback()
      throw error
    }
  }

  // async processPayment(cartId, paymentData) {
  // const cart = await models.Shoping_Cart.findByPk(cartId, {
  // include: [
  // { model: models.Reservation_Rooms, as: 'RoomItems' },
  // { model: models.Reservation_Tours, as: 'TourItems' },
  // ],
  // })

  // if (!cart) {
  // throw new Error('Shoping Cart does not exist')
  // }

  // // Calcular el total_price sumando los precios de las habitaciones y tours en el carrito
  // let totalPrice = 0
  // cart.RoomItems.forEach((roomItem) => {
  // totalPrice += roomItem.Room.price * roomItem.quantity
  // })
  // cart.TourItems.forEach((tourItem) => {
  // totalPrice += tourItem.Tour.price * tourItem.quantity
  // })

  // // Procesar el pago utilizando la API de Mercado Pago
  // const mercadoPagoAPI = new MercadoPagoAPI()
  // const paymentResult = await mercadoPagoAPI.processPayment(
  // totalPrice,
  // paymentData
  // )

  // // Actualizar el estado del carrito y otros datos relevantes
  // // (por ejemplo, guardar información de la transacción)

  // return cart
  // }

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
