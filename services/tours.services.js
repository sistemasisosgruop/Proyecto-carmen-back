const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')


class TourService {
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
      options.where.name = { [Op.iLike]: `%${name}` }
    }
    options.distinct = true

    const tours = await models.Tours.findAndCountAll(options)
    return tours
  }

  async getTourOr404(tourId) {
    let tour = await models.Tours.findByPk(tourId)
    if (!tour) throw new CustomError('Not found Tour', 404, 'Not Found')
    return tour
  }

  async createTour(userId, tourData) {
    const transaction = await models.Tours.sequelize.transaction({ type: 'READ_COMMITTED' })
    const user = await models.Users.findByPk(userId)

    try {
      if (user.dataValues.role_id != 1) {
        throw new CustomError(
          'Unauthorized',
          401,
          'Only admins can create new Tours'
        )
      }

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
          ages: tourData.ages
        },
        { transaction }
      )
      
      const tourInfo = await models.Tours_Info.create(
        {
          id: uuid4(),
          tour_id: tour.dataValues.id,
          // photos: tourData.tour_info.photos,
          what_to_do: tourData.tour_info.what_to_do,
          good_choise_for: tourData.tour_info.good_choise_for,
          cancellation_policy: tourData.tour_info.cancellation_policy,
          price_per_person: tourData.tour_info.price_per_person,
          available_dates: [tourData.tour_info.available_dates],
          schedule: tourData.tour_info.schedule,
        },
        { transaction }
      )

      const tourDetail = await models.Tours_Details.create(
        {
          id: uuid4(),
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
      return { tour, tourInfo, tourDetail }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = TourService
