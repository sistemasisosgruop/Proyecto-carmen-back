const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

class ReservationsService {
  constructor() {}

  async createReservationRoom(userId, roomId, reservationRoomData) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()

    const user = await models.Users.findByPk(userId)
    const room = await models.Rooms.findByPk(roomId)
    
    if (!user || !room) {
      throw new Error('Error creating the reservation')
    }
    
    // console.log('USER', user)
    // console.log('ROOM', room)
    console.log('ROOMDATA', reservationRoomData)

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
          purchase_date: reservationRoomData.purchaseDate,
          purchase_time: reservationRoomData.purchaseTime,
          number_of_people: reservationRoomData.numberOfPeople,
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






}

module.exports = ReservationsService
