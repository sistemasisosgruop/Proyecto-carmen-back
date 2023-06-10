const models = require('../database/models')

class ShopingCartsService {
  constructor() {}

  async addProductsToCart(userId, productId, productType, quantity) {
    const transaction = await models.Shoping_Cart.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if (!user) {
        throw new Error('User does not exist')
      }
      const userProduct = await models.User_Products.create({}, { transaction })
      await transaction.commit()
      return userProduct
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = ShopingCartsService
