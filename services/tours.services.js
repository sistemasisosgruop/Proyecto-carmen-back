const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
require('dotenv').config()

class TourService {
  constructor() {}

  async findAllTours() {
    const tours = await models.Tours.findAll({
      include: [
        {
          model: models.Tours_Details,
          as: 'Tours_Details',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
        {
          model: models.Tours_Info,
          as: 'Tours_Info',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
        {
          model: models.Tour_Images,
          as: 'Tour_Images',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      ],
    })
    const transformedTours = tours.map((tour) => {
      const { Tours_Details, Tours_Info, Tour_Images, ...rest } = tour.toJSON()
      const transformedTourDetails = Tours_Details
        ? { ...Tours_Details[0], id: undefined, tour_id: undefined }
        : null
      const transformedToursInfo = Tours_Info
        ? { ...Tours_Info[0], id: undefined, tour_id: undefined }
        : null
      const transformedToursImages = Tour_Images.map((image) => {
        const { id, tour_id, ...imageData } = image
        return imageData
      })
      return {
        ...rest,
        Tours_Details: transformedTourDetails,
        Tours_Info: transformedToursInfo,
        Tour_Images: transformedToursImages,
      }
    })
    return transformedTours
  }
  catch(error) {
    console.error('Error al obtener los tours:', error)
    throw new Error('Ocurrió un error al obtener los tours')
  }

  async getTourOr404(tourId) {
    let tour = await models.Tours.findByPk(tourId)
    if (!tour) throw new CustomError('Not found Tour', 404, 'Not Found')
    let tourInfo = await models.Tours_Info.findOne({
      where: {
        tour_id: tourId,
      },
      attributes: {
        exclude: ['id', 'tour_id', 'created_at', 'updated_at'],
      },
    })
    let tourDetail = await models.Tours_Details.findOne({
      where: {
        tour_id: tourId,
      },
      attributes: {
        exclude: ['id', 'tour_id', 'created_at', 'updated_at'],
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
          tour_name: tourData.tour_name,
          tour_description: tourData.tour_description,
          extras: tourData.extras,
          location: tourData.location,
          duration: tourData.duration,
          difficulty: tourData.difficulty,
          languages: tourData.languages,
          number_of_people: tourData.number_of_people,
          ages: tourData.ages,
        },
        { transaction }
      )

      const tourInfo = await models.Tours_Info.create(
        {
          tour_id: tour.dataValues.id,
          what_to_do: tourData.tour_info.what_to_do,
          good_choise_for: tourData.tour_info.good_choise_for,
          cancellation_policy: tourData.tour_info.cancellation_policy,
          price_per_person: tourData.tour_info.price_per_person,
          available_dates: tourData.tour_info.available_dates,
          schedule: tourData.tour_info.schedule,
        },
        { transaction }
      )

      const tourDetails = await models.Tours_Details.create(
        {
          tour_id: tour.dataValues.id,
          what_is_included: tourData.tour_details.what_is_included,
          what_is_not_included: tourData.tour_details.what_is_not_included,
          itinerary: tourData.tour_details.itinerary,
          departure_details: tourData.tour_details.departure_details,
          return_details: tourData.tour_details.return_details,
          accessibility: tourData.tour_details.accessibility,
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
          tour_id: tour.id, // Opcional si estás valorando un Tour
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
        tour_id: tourId,
      },
    })
    return ratingsTour
  }
}

module.exports = TourService
