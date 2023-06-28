const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
require('dotenv').config()

class TourService {
  constructor() {}

  async findAllTours(limit, offset) {
    const tours = await models.Tours.findAll({
      limit,
      offset,
      include: [
        {
          model: models.Tours_Details,
          as: 'Tours_Details',
          attributes: [
            'whatIsIncluded',
            'whatIsNotIncluded',
            'itinerary',
            'departureDetails',
            'returnDetails',
            'accessibility',
          ],
          required: true,
        },
        {
          model: models.Tours_Info,
          as: 'Tours_Info',
          attributes: [
            'whatToDo',
            'goodChoiseFor',
            'cancellationPolicy',
            'pricePerPerson',
            'availableDates',
            'schedule',
          ],
          required: true,
        },
        {
          model: models.Tour_Images,
          as: 'Tour_Images',
          attributes: ['id', 'tourId', 'imageUrl', 'order'],
          required: false,
        },
      ],
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      raw: true,
      nest: true,
    })

    return tours
  }

  async getTourOr404(tourId) {
    let tour = await models.Tours.findByPk(tourId)
    if (!tour) throw new CustomError('Not found Tour', 404, 'Not Found')
    let tourInfo = await models.Tours_Info.findOne({
      where: {
        tourId: tourId,
      },
      attributes: {
        exclude: ['id', 'tourId', 'created_at', 'updated_at'],
      },
    })
    let tourDetail = await models.Tours_Details.findOne({
      where: {
        tourId: tourId,
      },
      attributes: {
        exclude: ['id', 'tourId', 'created_at', 'updated_at'],
      },
    })
    return { tour, tourInfo, tourDetail }
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
        },
        { transaction }
      )

      const tourInfo = await models.Tours_Info.create(
        {
          tourId: tour.dataValues.id,
          whatToDo: tourData.tourInfo.whatToDo,
          goodChoiseFor: tourData.tourInfo.goodChoiseFor,
          cancellationPolicy: tourData.tourInfo.cancellationPolicy,
          pricePerPerson: tourData.tourInfo.pricePerPerson,
          availableDates: tourData.tourInfo.availableDates,
          schedule: tourData.tourInfo.schedule,
        },
        { transaction }
      )

      const tourDetails = await models.Tours_Details.create(
        {
          tourId: tour.dataValues.id,
          whatIsIncluded: tourData.tourDetails.whatIsIncluded,
          whatIsNotIncluded: tourData.tourDetails.whatIsNotIncluded,
          itinerary: tourData.tourDetails.itinerary,
          departureDetails: tourData.tourDetails.departureDetails,
          returnDetails: tourData.tourDetails.returnDetails,
          accessibility: tourData.tourDetails.accessibility,
        },
        { transaction }
      )
      await transaction.commit()
      return { tour, tourInfo, tourDetails }
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
