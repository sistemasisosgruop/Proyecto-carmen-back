const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

class ShopingCartsService {
  constructor() {}

  async addToCart(userId, roomId, tourId, quantity) {
    // Iniciar una transacción
    const transacción = await models.Shoping_Cart.sequelize.transaction()

    try {
      // Buscar o crear el carrito del usuario
      let cart = await models.Shoping_Cart.findOrCreate({
        where: { user_id: userId },
        defaults: { user_id: userId },
      })

      // Agregar la habitación al carrito si se proporciona un ID de habitación
      if (roomId) {
        const room = await models.Rooms.findByPk(roomId)
        if (!room) {
          throw new Error('La habitación no existe')
        }

        // Crear o actualizar el elemento de carrito para la habitación
        await models.User_Products.findOrCreate({
          where: { cart_id: cart.id, room_id: roomId },
          defaults: {
            cart_id: cart.id,
            room_id: roomId,
            quantity: quantity || 1,
          },
        })
      }

      // Agregar el tour al carrito si se proporciona un ID de tour
      if (tourId) {
        const tour = await models.Tours.findByPk(tourId)
        if (!tour) {
          throw new Error('El tour no existe')
        }

        // Crear o actualizar el elemento de carrito para el tour
        await models.User_Products.findOrCreate({
          where: { cart_id: cart.id, tour_id: tourId },
          defaults: {
            cart_id: cart.id,
            tour_id: tourId,
            quantity: quantity || 1,
          },
        })
      }

      // Confirmar la transacción
      await transacción.commit()

      // Devolver el carrito actualizado
      cart = await models.Shoping_Cart.findByPk(cart.id, {
        include: [
          { model: models.Rooms, as: 'RoomItems' },
          { model: models.Tours, as: 'TourItems' },
        ],
      })

      return cart
    } catch (error) {
      // Revertir la transacción en caso de error
      await transacción.rollback()
      throw error
    }
  }

  async processPayment(cartId, paymentData) {
    const cart = await models.Shoping_Cart.findByPk(cartId, {
      include: [
        { model: models.Rooms, as: 'RoomItems' },
        { model: models.Tours, as: 'TourItems' },
      ],
    })

    if (!cart) {
      throw new Error('El carrito no existe')
    }

    // Calcular el total_price sumando los precios de las habitaciones y tours en el carrito
    let totalPrice = 0
    cart.RoomItems.forEach((roomItem) => {
      totalPrice += roomItem.Room.price * roomItem.quantity
    })
    cart.TourItems.forEach((tourItem) => {
      totalPrice += tourItem.Tour.price * tourItem.quantity
    })

    // Procesar el pago utilizando la API de Mercado Pago
    const mercadoPagoAPI = new MercadoPagoAPI()
    const paymentResult = await mercadoPagoAPI.processPayment(
      totalPrice,
      paymentData
    )

    // Actualizar el estado del carrito y otros datos relevantes
    // (por ejemplo, guardar información de la transacción)

    return paymentResult
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
