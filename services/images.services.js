const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')

class ImagesService {
  constructor() {}

  async getAvailableImageOrders(productId) {
    console.log(productId)
    let availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let images = await models.Images.findAll({
      where: { productId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    })

    if (!images) return availableValues
    if (images.length == 0) return availableValues
    if (images.length >= availableValues.length)
      throw new CustomError(
        'Not available spots for images. First, remove a image',
        409,
        'No Spots Available'
      )
    let existedOrders = images.map((image) => image['order'])

    let availableSpots = availableValues.filter(
      (spot) => !existedOrders.includes(spot)
    )

    return availableSpots
  }

  async createImage(productId, imageUrl, order) {
    console.log(productId)
    console.log(imageUrl)
    console.log(order)
    const transaction = await models.Images.sequelize.transaction()

    try {
      let newImage = await models.Images.create(
        {
          id: uuid4(),
          productId: productId,
          imageUrl: imageUrl,
          order: order,
        },
        { transaction }
      )
      await transaction.commit()
      return newImage
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(productId, order) {
    const image = await models.Images.findOne({
      where: { productId, order: parseInt(order) },
    })
    if (!image)
      throw new CustomError(
        'Not Found Product Image with this order',
        404,
        'Not Found'
      )
    return image
  }

  async removeImage(productId, order) {
    const transaction = await models.Images.sequelize.transaction()
    try {
      let department = await models.Images.findOne(
        {
          where: { productId, order: parseInt(order) },
        },
        { transaction }
      )

      await department.destroy({ transaction })
      await transaction.commit()

      return department
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = ImagesService
