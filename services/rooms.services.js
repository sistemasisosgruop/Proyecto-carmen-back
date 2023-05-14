const { v4: uuid4 } = require('uuid')
const models = require('../database/models')

class RoomService {
  async createRoom(userId, {roomData}) {
    const transaction = await models.Users.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      const roomDetails = await models.Room_Details.findByPk(
        roomData
      )

      if(user.dataValues.role_id !== '1'){
        throw new Error ('Only admins can create New Rooms')
      }

      const room = await models.Rooms.create(
        {
          id: uuid4(),
          room_type: roomData.room_type,
          description: roomData.description,
          address: roomData.address,
          price: roomData.price,
          check_in: roomData.check_in,
          check_out: roomData.check_out,
          num_bathrooms: roomData.num_bathrooms,
          num_beds: roomData.num_beds,
          num_rooms: roomDetails,
          extras: roomData.extras,
          details: roomData.details,
        },
        { transaction }
      )
      // Create the room with the provided data.
      if (roomDetails) {
        await room.setRoomDetails(roomDetails)
      }
      await transaction.commit()
      return room
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
module.exports = RoomService
