const { v4: uuid4 } = require('uuid')
const models = require('../database/models')

class RoomService {
  async createRoom(userId, roomData) {
    const transaction = await models.Users.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if(user.dataValues.role_id !== 1){
        throw new Error ('Only admins can create New Rooms')
      }
      console.log('DATA', roomData)
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
          // extras: roomData.extras,
          // details: roomData.details,
        },
        { transaction }
      )
      console.log('ROOM', room.dataValues.id)
      const roomDetails = await models.Room_Details.create({
        room_id: room.dataValues.id,
        type_room: roomData.num_room.type_room, 
        num_bed: roomData.num_room.num_bed, 
        type_bed: roomData.num_room.type_bed,
        type_bed_2: roomData.num_room.type_bed_2,
        photos: roomData.num_room.photos,
      }, { transaction }
      ) 
      // Create the room with the provided data.
      // if (roomDetails) {
      //   await room.setRoomDetails(roomDetails)
      // }
      await transaction.commit()
      return {room, roomDetails}
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
module.exports = RoomService
