const ReservationsService = require('../services/reservations.services')
const models = require('../database/models')
const reservationService = new ReservationsService()

class ReservationsControllers {
  constructor() {}

  async getReservationsByUser(req, res) {
    const userId = req.user.id

    try {
      const reservationsUser =
        await reservationService.findRoomReservationsByUser(userId)

      return res.status(200).json(reservationsUser)
    } catch (error) {
      return res.status(401).json({ message: error.mesage })
    }
  }

  async getRoomReservationById(req, res) {
    const { roomReservationId } = req.params

    try {
      const reservation = await reservationService.findRoomReservationById(
        roomReservationId
      )
      return res.status(200).json(reservation)
    } catch (error) {
      return res.status(404).json({ message: error })
    }
  }

  async postRoomReservation(req, res) {
    const userId = req.user.id
    const { roomId } = req.params
    const { purchase_date, purchase_time, number_of_people, total_price } =
      req.body

    try {
      const reservationRoomData = {
        purchase_date,
        purchase_time,
        number_of_people,
        total_price,
      }

      if (!reservationRoomData) {
        throw new Error('All fields are required!')
      }

      const reservationRoom = await reservationService.createRoomReservation(
        userId,
        roomId,
        reservationRoomData
      )
      return res
        .status(201)
        .json(
          { message: 'Room reservation created succesfully' },
          reservationRoom
        )
    } catch (error) {
      return res.status(404).json({
        message: error.message,
        fields: {
          purchase_date: 'Date',
          purchase_time: 'Date',
          number_of_people: 'Integer',
          total_price: 'Integer',
        },
      })
    }
  }

  async patchRoomReservation(req, res) {
    const { roomReservationId } = req.params
    const { purchase_date, purchase_time, number_of_people, total_price } =
      req.body

    try {
      const reservationData = {
        purchase_date,
        purchase_time,
        number_of_people,
        total_price,
      }

      const reservationEdited = await reservationService.updateRoomReservation(
        roomReservationId,
        reservationData
      )
      return res.status(201).json(reservationEdited)
    } catch (error) {
      return res.status(401).json({ message: error.mesage })
    }
  }

  async deleteRoomReservation(req, res) {
    try {
      let { roomReservationId } = req.params
      let reservation = await reservationService.removeRoomReservation(
        roomReservationId
      )
      return res.json({ results: reservation, message: 'removed' })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  //! ======================================================

  async getTourReservationById(req, res) {
    const { tourReservationId } = req.params

    try {
      const reservation = await reservationService.findTourReservationById(
        tourReservationId
      )
      return res.status(200).json(reservation)
    } catch (error) {
      return res.status(404).json({ message: error })
    }
  }

  async postTourReservation(req, res) {
    const userId = req.user.id
    const { tourId } = req.params
    const { purchase_date, purchase_time, number_of_people, total_purchase } =
      req.body
    try {
      const reservationTourData = {
        purchase_date,
        purchase_time,
        number_of_people,
        total_purchase,
      }

      if (
        !reservationTourData.number_of_people ||
        !reservationTourData.purchase_time ||
        !reservationTourData.purchase_date ||
        !reservationTourData.total_purchase
      ) {
        throw new Error('All fields are required!')
      }
      const reservationTour = await reservationService.createTourReservation(
        userId,
        tourId,
        reservationTourData
      )
      return res.status(201).json({
        message: 'Tour reservation created succesfully',
        reservationTour,
      })
    } catch (error) {
      return res.status(404).json({
        message: error.message,
        fields: {
          purchase_date: 'Date',
          purchase_time: 'Date',
          number_of_people: 'Integer',
          total_purchase: 'Integer',
        },
      })
    }
  }

  async patchTourReservation(req, res) {
    const { purchase_date, purchase_time, number_of_people, total_purchase } =
      req.body
    const { tourReservationId } = req.params
    try {
      const reservationData = {
        purchase_date,
        purchase_time,
        number_of_people,
        total_purchase,
      }
      const reservationEdited = await reservationService.updateRoomReservation(
        tourReservationId,
        reservationData
      )
      return res.status(201).json(reservationEdited)
    } catch (error) {
      return res.status(401).json({ message: error.mesage })
    }
  }

  async deleteTourReservation(req, res) {
    try {
      let { tourReservationId } = req.params
      let reservation = await reservationService.removeTourReservation(
        tourReservationId
      )
      return res.json({ results: reservation, message: 'removed' })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}
module.exports = ReservationsControllers
