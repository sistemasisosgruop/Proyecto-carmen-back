const ShopingCartsService = require('../services/shoppingCart.services')
const shopingCartService = new ShopingCartsService()

class ShopingCartsController {
  constructor() {}

  async postShopingCart(req, res) {
    const userId = req.user.id
    const { reservationRoomId, reservationTourId, quantity, paymentMethod } =
      req.body

    try {
      if (!reservationRoomId || !reservationTourId) {
        return res.status(400).json({ error: 'All fields are required' })
      }

      const cart = await shopingCartService.addProductsToCart(
        userId,
        reservationRoomId,
        reservationTourId,
        quantity,
        paymentMethod
      )
      return res.status(201).json({ results: cart })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = ShopingCartsController
