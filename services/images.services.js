const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const models = require('../database/models')

class ImageService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    options.distinct = true

    const rooms = await models.Images.findAndCountAll(options)
    return rooms
  }

  //? Get image by Id
  async getImageOr404(imageId) {
    let image = await models.Images.findByPk(imageId)
    if (!image) throw new CustomError('Not found Image', 404, 'Not Found')
    return image
  }
}

module.exports = ImageService