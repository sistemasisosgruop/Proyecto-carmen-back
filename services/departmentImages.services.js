const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
// const { v4: uuid4 } = require('uuid')

class DepartmentImagesService {
  constructor() {}

  async getAvailableImageOrders(departmentId) {
    let availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let images = await models.Department_Images.findAll({
      where: { departmentId: departmentId },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    })

    if (!images) return availableValues
    if (images.length == 0) return availableValues
    if (images.length >= availableValues.length)
      throw new CustomError(
        'Not available spots for images for this Department. First, remove a image',
        409,
        'No Spots Available'
      )
    let existedOrders = images.map((image) => image['order'])

    let availableSpots = availableValues.filter(
      (spot) => !existedOrders.includes(spot)
    )

    return availableSpots
  }

  async createImage(departmentId, imageUrl, order) {
    const transaction = await models.Department_Images.sequelize.transaction()

    try {
      let newImage = await models.Department_Images.create(
        { departmentId, imageUrl, order },
        { transaction }
      )
      await transaction.commit()
      return newImage
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(departmentId, order) {
    const departmentImage = await models.Department_Images.findOne({
      where: { departmentId, order: parseInt(order) },
    })
    if (!departmentImage)
      throw new CustomError(
        'Not Found Department Image with this order',
        404,
        'Not Found'
      )
    return departmentImage
  }

  async removeImage(departmentId, order) {
    const transaction = await models.Department_Images.sequelize.transaction()
    try {
      let department = await models.Department_Images.findOne(
        {
          where: { departmentId, order: parseInt(order) },
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

module.exports = DepartmentImagesService
