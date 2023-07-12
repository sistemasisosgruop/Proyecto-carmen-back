const models = require('../database/models')
const { v4: uuid4 } = require('uuid')
class ShopingCartsService {
  constructor() {}

  async addProductsToCart(userId, cartData) {
    // Iniciar una transacción
    const transacción = await models.ShopingCart.sequelize.transaction()

    try {
      // Buscar o crear el carrito del usuario
      let [cart, created] = await models.ShopingCart.findOrCreate({
        where: { id: uuid4(), userId: userId },
        defaults: { userId: userId },
      })
      // Agregar la habitación al carrito si se proporciona un ID de habitación
      if (cartData.reservationDepartmentId) {
        const reservationDepartment =
          await models.ReservationDepartments.findOne({
            where: {
              id: cartData.reservationDepartmentId,
            },
          })
        if (!reservationDepartment) {
          throw new Error(`Department reservation for user ${userId} not found`)
        }

        console.log('USER: ', userId)
        console.log('CART: ', cart)
        console.log('RESERVSTIONDepartment: ', reservationDepartment)
        // Crear o actualizar el elemento de carrito para la habitación
        await models.UserProducts.findOrCreate({
          where: {
            id: uuid4(),
            cartId: cart.dataValues.id,
            departmentId: reservationDepartment.dataValues.departmentId,
          },
          defaults: {
            cartId: cart.dataValues.id,
            departmentId: reservationDepartment.dataValues.departmentId,
            quantity: cartData.quantity || 1,
          },
        })
      }

      // Agregar el tour al carrito si se proporciona un ID de tour
      if (cartData.reservationTourId) {
        const reservationTour = await models.ReservationTours.findOne({
          where: {
            id: cartData.reservationTourId,
          },
        })
        if (!reservationTour) {
          throw new Error(`Tour reservation for user ${userId} not found`)
        }

        console.log(reservationTour)
        // Crear o actualizar el elemento de carrito para el tour
        await models.UserProducts.findOrCreate({
          where: {
            id: uuid4(),
            cartId: cart.id,
            tourId: reservationTour.dataValues.tourId,
          },
          defaults: {
            cartId: cart.id,
            tourId: reservationTour.dataValues.tourId,
            quantity: cartData.quantity || 1,
          },
        })
      }

      // Confirmar la transacción
      console.log(cart)
      // Devolver el carrito actualizado
      cart = await models.ShopingCart.findByPk(cart.dataValues.id, {
        include: [{ model: models.UserProducts, as: 'UserProducts' }],
      })
      console.log(cart)
      await transacción.commit()
      return cart
    } catch (error) {
      // Revertir la transacción en caso de error
      await transacción.rollback()
      throw error
    }
  }

  // async processPayment(cartId, paymentData) {
  // const cart = await models.ShopingCart.findByPk(cartId, {
  // include: [
  // { model: models.ReservationRooms, as: 'RoomItems' },
  // { model: models.ReservationTours, as: 'TourItems' },
  // ],
  // })

  // if (!cart) {
  // throw new Error('Shoping Cart does not exist')
  // }

  // // Calcular el totalprice sumando los precios de las habitaciones y tours en el carrito
  // let totalPrice = 0
  // cart.RoomItems.forEach((roomItem) => {
  // totalPrice += roomItem.Department.price * roomItem.quantity
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
    const product = await models.UserProducts.findOne({
      where: {
        userId: userId,
      },
    })
    return product
  }
}

module.exports = ShopingCartsService
