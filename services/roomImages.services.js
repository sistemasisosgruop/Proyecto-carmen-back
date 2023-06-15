const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')

class RoomImagesService {
  constructor() {}

  async getAvailableImageOrders(roomId) {
    let availableValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let images = await models.Room_Images.findAll({
      where: { room_id: roomId },
      attributes: { exclude: ['created_at', 'updated_at'] },
      raw: true,
    })

    if (!images) return availableValues
    if (images.length == 0) return availableValues
    if (images.length >= availableValues.length)
      throw new CustomError(
        'Not available spots for images for this Room. First, remove a image',
        409,
        'No Spots Available'
      )
    let existedOrders = images.map((image) => image['order'])

    let availableSpots = availableValues.filter(
      (spot) => !existedOrders.includes(spot)
    )

    return availableSpots
  }

  async createImage(room_id, image_url, order) {
    const transaction = await models.sequelize.transaction()

    try {
      let newImage = await models.Room_Images.create(
        { id: uuid4(), room_id, image_url, order },
        { transaction }
      )
      await transaction.commit()
      return newImage
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getImageOr404(room_id, order) {
    const roomImage = await models.Room_Images.findOne({
      where: { room_id, order: parseInt(order) },
    })
    if (!roomImage)
      throw new CustomError(
        'Not Found Room Image with this order',
        404,
        'Not Found'
      )
    return roomImage
  }

  async removeImage(room_id, order) {
    const transaction = await models.sequelize.transaction()
    try {
      let room = await models.Room_Images.findOne(
        {
          where: { room_id, order: parseInt(order) },
        },
        { transaction }
      )

      await room.destroy({ transaction })
      await transaction.commit()

      return room
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = RoomImagesService
