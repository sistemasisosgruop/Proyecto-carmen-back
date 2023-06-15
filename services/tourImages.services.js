const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')

class TourImagesService {
  constructor() {}

  async getAvailableImageOrders(tourId) {
    let availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let images = await models.Tour_Images.findAll({
      where: { tour_id: tourId },
      attributes: { exclude: ['created_at', 'updated_at'] },
      raw: true,
    })

    if (!images) return availableValues
    if (images.length == 0) return availableValues
    if (images.length >= availableValues.length)
      throw new CustomError(
        'Not available spots for images for this Tour. First, remove a image',
        409,
        'No Spots Available'
      )
    let existedOrders = images.map((image) => image['order'])

    let availableSpots = availableValues.filter(
      (spot) => !existedOrders.includes(spot)
    )

    return availableSpots
  }

  async createImage(tour_id, image_url, order) {
    const transaction = await models.sequelize.transaction()

    try {
      let newImage = await models.Tour_Images.create(
        { id: uuid4(), tour_id, image_url, order },
        { transaction }
      )

      await transaction.commit()
      return newImage
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(tour_id, order) {
    const tourImage = await models.Tour_Images.findOne({
      where: { tour_id, order: parseInt(order) },
    })
    if (!tourImage)
      throw new CustomError(
        'Not Found Tour Image with this order',
        404,
        'Not Found'
      )
    return tourImage
  }

  async removeImage(tour_id, order) {
    const transaction = await models.sequelize.transaction()
    try {
      let tour = await models.Tour_Images.findOne(
        {
          where: { tour_id, order: parseInt(order) },
        },
        { transaction }
      )

      await tour.destroy({ transaction })
      await transaction.commit()

      return tour
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = TourImagesService
