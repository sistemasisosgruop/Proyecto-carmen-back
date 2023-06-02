const ReservationsService = require('../services/reservations.services')
const reservationService = new ReservationsService()

class ReservationsControllers {
  constructor() {}

  async postRoomReservation(req, res) {
    const userId = req.user.id
    const { roomId } = req.params
    const { purchase_date, purchase_time, number_of_people } = req.body

    try {
        const reservationRoomData = { purchase_date, purchase_time, number_of_people }

        if(!reservationRoomData.number_of_people || !reservationRoomData.purchase_time || !reservationRoomData.purchase_date){
          throw new Error ('All fields are required!')
        }
        const data = reservationService.createReservationRoom(userId, roomId, reservationRoomData)
        return res.status(201).json(data)
    } catch (error) {
        return res.status(404).json({mesage: error.message, fields: {
          purchase_date: 'Date', 
          purchase_time: 'Date', 
          number_of_people: 'Integer'
        }})
    }

  }
}

module.exports = ReservationsControllers
