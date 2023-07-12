const ToursService = require('../services/tours.services')
const { getPagination, getPagingData } = require('../utils/pagination')
const tourService = new ToursService()

class TourController {
  constructor() {}

  async getAllTours(req, res) {
    try {
      let query = req.query
      let { page, size } = query

      const { limit, offset } = getPagination(page, size, '10')
      query.limit = limit
      query.offset = offset
      const tours = await tourService.findAllTours(query)
      const results = getPagingData(tours, page, limit)
      res.json(results)
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
      tourName,
      tourDescription,
      extras,
      location,
      duration,
      difficulty,
      languages,
      numberOfPeople,
      ages,
      tourInfo,
      details,
    } = req.body

    try {
      const tourData = {
        tourName,
        tourDescription,
        extras,
        location,
        duration,
        difficulty,
        languages,
        numberOfPeople,
        ages,
        tourInfo,
        details,
      }

      const tour = await tourService.createTour(tourData)
      return res.status(201).json(tour)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          tourName: 'String',
          tourDescription: 'Text',
          extras: 'String',
          location: 'String',
          duration: 'String',
          difficulty: 'String',
          languages: ['String', 'String2'],
          numberdOfPeople: 'String',
          ages: 'String',
          tourInfo: {
            whatToDo: 'Text',
            goodChoiseFor: 'Text',
            cancellationPolicy: 'Text',
            pricePerPerson: 'Number',
            availableDates: ['01-01-2022', '02-02-2023'],
            schedule: 'String',
          },
          tourDetails: {
            whatIsIncluded: 'Text',
            whatIsNotIncluded: 'Text',
            itinerary: ['String', 'String2'],
            departureDetails: 'String',
            returnDetails: 'String',
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
      tourName,
      tourDescription,
      extras,
      location,
      duration,
      difficulty,
      languages,
      numberdOfPeople,
      ages,
      tourInfo,
      tourDetails,
    } = req.body

    await tourService
      .updateTour(tourId, {
        tourName,
        tourDescription,
        extras,
        location,
        duration,
        difficulty,
        languages,
        numberdOfPeople,
        ages,
        tourInfo,
        tourDetails,
      })
      .then((data) => res.status(200).json(data))
      .catch((err) =>
        res.status(400).json({
          message: err.message,
          fields: {
            tourName: 'String',
            tourDescription: 'Text',
            extras: 'String',
            location: 'String',
            duration: 'String',
            difficulty: 'String',
            languages: ['String'],
            numberdOfPeople: 'String',
            ages: 'String',
            tourInfo: {
              whatToDo: 'Text',
              goodChoiseFor: 'Text',
              cancellationPolicy: 'Text',
              pricePerPerson: 'Number',
              availableDates: ['Date'],
              schedule: 'String',
            },
            tourDetails: {
              whatIsIncluded: 'Text',
              whatIsNotIncluded: 'Text',
              itinerary: ['String'],
              departureDetails: 'String',
              returnDetails: 'String',
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
