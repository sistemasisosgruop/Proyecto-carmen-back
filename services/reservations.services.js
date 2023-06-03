const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

class ReservationsService {
  constructor() {}

  async findReservationRoomById(reservationId) {
    const reservations = await models.Reservation_Rooms.findByPk(reservationId)
    return reservations
  }

  async findReservationsRoomsByUser(userId) {
    const user = await models.Users.findByPk(userId)
    const reservations = await models.Reservation_Rooms.findAll({
      where:{
        user_id: user.id
      }
    })
    return reservations
  }

  async createReservationRoom(userId, roomId, reservationRoomData) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()

    const user = await models.Users.findByPk(userId)
    const room = await models.Rooms.findByPk(roomId)

    if (!user || !room) {
      throw new Error('Error creating the reservation')
    }

    try {
      const reservation = await models.Reservation_Rooms.create(
        {
          id: uuid4(),
          user_id: user.dataValues.id,
          room_id: room.dataValues.id,
          type_room: room.dataValues.room_type,
          check_in: room.dataValues.check_in,
          check_out: room.dataValues.check_out,
          address: room.dataValues.address,
          purchase_date: reservationRoomData.purchase_date,
          purchase_time: reservationRoomData.purchase_time,
          number_of_people: reservationRoomData.number_of_people,
          price_for_night: room.dataValues.price,
        },
        { transaction }
      )
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateReservation(reservationId, reservationRoomData) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()
    
    try {
      const reservation = await models.Reservation_Rooms.findByPk(reservationId)
      if (!reservation) {
        throw new Error('Reservation not found!')
      }

      const editedRoom = await reservation.update({
        purchase_date: reservationRoomData.purchase_date,
        purchase_time: reservationRoomData.purchase_time,
        number_of_people: reservationRoomData.number_of_people
      }, 
      {transaction})
      await transaction.commit()
      return editedRoom
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeReservation(reservationId) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()
    try {
      let reservation = await models.Reservation_Rooms.findByPk(reservationId)

      if (!reservation) throw new CustomError('Not found reservation', 404, 'Not Found')

      await reservation.destroy({ transaction })
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


}

module.exports = ReservationsService
