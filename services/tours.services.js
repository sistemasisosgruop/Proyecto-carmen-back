const { Op } = require('sequelize')
const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
require('dotenv').config()

class TourService {
  constructor() {}

  async findAllTours(query) {
    const options = {
      where: {},
      // include: [
      //   {
      //     model: models.Images,
      //     as: 'Images',
      //   },
      // ],
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

    const tours = await models.Tours.findAndCountAll(options)
    return tours
  }

  async getTourOr404(tourId) {
    let tour = await models.Tours.findByPk(tourId)
    if (!tour) throw new CustomError('Not found Tour', 404, 'Not Found')
    let tourImages = await models.Images.findAll({
      where: {
        productId: tourId,
      },
      attributes: {
        exclude: ['id', 'tourId', 'createdAt', 'updatedAt'],
      },
    })
    return { tour, tourImages }
  }

  async createTour(tourData) {
    const transaction = await models.Tours.sequelize.transaction()

    try {
      const tour = await models.Tours.create(
        {
          id: uuid4(),
          tourName: tourData.tourName,
          tourDescription: tourData.tourDescription,
          extras: tourData.extras,
          location: tourData.location,
          duration: tourData.duration,
          difficulty: tourData.difficulty,
          languages: tourData.languages,
          numberOfPeople: tourData.numberOfPeople,
          ages: tourData.ages,
          tourInfo: tourData.tourInfo,
          details: tourData.details,
        },
        { transaction }
      )

      await transaction.commit()
      return tour
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTour(tourId) {
    const transaction = await models.Tours.sequelize.transaction()
    try {
      let tour = await models.Tours.findByPk(tourId)

      if (!tour) throw new CustomError('Not found tour', 404, 'Not Found')
      await tour.destroy({ transaction })
      await transaction.commit()

      return tour
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async createTourRating(userId, tourId, ratingData) {
    const transaction = await models.Ratings.sequelize.transaction()
    const user = await models.Users.findByPk(userId)
    const tour = await models.Tours.findByPk(tourId)

    try {
      if (!user) {
        throw new Error('Only users can rate tours')
      }
      const rating = await models.Ratings.create(
        {
          id: uuid4(),
          tourId: tour.id, // Opcional si estás valorando un Tour
          rate: ratingData.rate,
          comment: ratingData.comment,
        },
        { transaction }
      )
      await transaction.commit()
      return rating
    } catch (error) {
      await transaction.rollback()
      // Error al crear la valoración y comentario
      throw error
    }
  }

  async findRatingsByTour(tourId) {
    const ratingsTour = await models.Ratings.findAll({
      where: {
        tourId: tourId,
      },
    })
    return ratingsTour
  }
}

module.exports = TourService
