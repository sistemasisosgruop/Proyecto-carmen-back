const ReservationsService = require('../services/reservations.services')
const reservationService = new ReservationsService()

class ReservationsControllers {
  constructor() {}

  async getReservationRoomById(req, res) {
    const { reservationId } = req.params

    try {
      const reservation = await reservationService.findReservationRoomById(
        reservationId
      )
      return res.status(200).json(reservation)
    } catch (error) {
      return res.status(404).json({ message: error })
    }
  }

  async getReservationsByUser(req, res) {
    const userId = req.user.id

    try {
      const reservationsUser =
        await reservationService.findReservationsRoomsByUser(userId)

      return res.status(200).json(reservationsUser)
    } catch (error) {
      return res.status(401).json({ message: error.mesage })
    }
  }

  async postRoomReservation(req, res) {
    const userId = req.user.id
    const { roomId } = req.params
    const { purchase_date, purchase_time, number_of_people } = req.body

    try {
      const reservationRoomData = {
        purchase_date,
        purchase_time,
        number_of_people,
      }

      if (
        !reservationRoomData.number_of_people ||
        !reservationRoomData.purchase_time ||
        !reservationRoomData.purchase_date
      ) {
        throw new Error('All fields are required!')
      }
      const data = reservationService.createReservationRoom(
        userId,
        roomId,
        reservationRoomData
      )
      return res.status(201).json(data)
    } catch (error) {
      return res.status(404).json({
        mesage: error.message,
        fields: {
          purchase_date: 'Date',
          purchase_time: 'Date',
          number_of_people: 'Integer',
        },
      })
    }
  }

  async patchReservation(req, res) {
    const { reservationId } = req.params
    const { purchase_date, purchase_time, number_of_people } = req.body

    try {
      const reservationData = {
        purchase_date,
        purchase_time,
        number_of_people,
      }

      const reservationEdited = await reservationService.updateReservation(
        reservationId,
        reservationData
      )
      return res.status(201).json(reservationEdited)
    } catch (error) {
      return res.status(401).json({ message: error.mesage })
    }
  }

  async deleteReservation(req, res) {
    try {
      let { reservationId } = req.params
      let reservation = await reservationService.removeReservation(reservationId)
      return res.json({ results: reservation, message: 'removed' })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}
module.exports = ReservationsControllers
