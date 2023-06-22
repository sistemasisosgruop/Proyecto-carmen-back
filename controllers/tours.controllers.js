const ToursService = require('../services/tours.services')
const { getPagination } = require('../utils/pagination')
const tourService = new ToursService()

class TourController {
  constructor() {}

  async getAllTours(req, res) {
    const { page, size } = req.query

    try {
      const { limit, offset } = getPagination(page, size)
      const tours = await tourService.findAllTours(limit, offset)
      res.json(tours)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Tours' })
    }
  }

  async getTour(req, res) {
    try {
      let { tourId } = req.params
      let tour = await tourService.getTourOr404(tourId)
      return res.status(200).json(tour)
    } catch (error) {
      return res.status(404).json({ message: error })
    }
  }

  async postTour(req, res) {
    const {
      tour_name,
      tour_description,
      extras,
      location,
      duration,
      difficulty,
      languages,
      number_of_people,
      ages,
      tour_info,
      tour_details,
    } = req.body

    try {
      const tour = await tourService.createTour(
        tour_name,
        tour_description,
        extras,
        location,
        duration,
        difficulty,
        languages,
        number_of_people,
        ages,
        tour_info,
        tour_details
      )
      return res.status(201).json(tour)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          tour_name: 'String',
          tour_description: 'Text',
          extras: 'String',
          location: 'String',
          duration: 'String',
          difficulty: 'String',
          languages: ['String'],
          number_of_people: 'String',
          ages: 'String',
          tour_info: {
            what_to_do: 'Text',
            good_choise_for: 'Text',
            cancellation_policy: 'Text',
            price_per_person: 'Number',
            available_dates: ['Date'],
            schedule: 'String',
          },
          tour_details: {
            what_is_included: 'Text',
            what_is_not_included: 'Text',
            itinerary: ['String'],
            departure_details: 'String',
            return_details: 'String',
            accessibility: 'Text',
          },
        },
      })
    }
  }

  async deleteTour(req, res) {
    try {
      let { tourId } = req.params
      let tour = await tourService.removeTour(tourId)
      return res.status(201).json({ results: tour, message: 'removed' })
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  async updateTour(req, res) {
    let { tourId } = req.params
    let {
      tour_name,
      tour_description,
      extras,
      location,
      duration,
      difficulty,
      languages,
      number_of_people,
      ages,
      tour_info,
      tour_details,
    } = req.body

    await tourService
      .updateTour(tourId, {
        tour_name,
        tour_description,
        extras,
        location,
        duration,
        difficulty,
        languages,
        number_of_people,
        ages,
        tour_info,
        tour_details,
      })
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(400).json({
          message: err.message,
          fields: {
            tour_name: 'String',
            tour_description: 'Text',
            extras: 'String',
            location: 'String',
            duration: 'String',
            difficulty: 'String',
            languages: ['String'],
            number_of_people: 'String',
            ages: 'String',
            tour_info: {
              what_to_do: 'Text',
              good_choise_for: 'Text',
              cancellation_policy: 'Text',
              price_per_person: 'Number',
              available_dates: ['Date'],
              schedule: 'String',
            },
            tour_details: {
              what_is_included: 'Text',
              what_is_not_included: 'Text',
              itinerary: ['String'],
              departure_details: 'String',
              return_details: 'String',
              accessibility: 'Text',
            },
          },
        })
      )
  }

  async postTourRating(req, res) {
    const userId = req.user.id
    const { tourId } = req.params
    const { rate, comment } = req.body

    try {
      const ratingData = {
        rate,
        comment,
      }

      if (!ratingData.rate || !ratingData.comment) {
        throw new Error('All fields are required!')
      }

      const rating = await tourService.createTourRating(
        userId,
        tourId,
        ratingData
      )
      return res
        .status(201)
        .json({ message: 'Rate created succesfully', rating })
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        fields: {
          rate: 'Float',
          comment: 'Text',
        },
      })
    }
  }

  async getRatingsByTour(req, res) {
    const { tourId } = req.params

    try {
      const ratesTour = await tourService.findRatingsByTour(tourId)
      return res.status(200).json(ratesTour)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = TourController
