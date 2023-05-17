const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')

class RoomService {

  constructor() {}
  
  //? Get All Rooms with pagination
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
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    options.distinct = true

    const rooms = await models.Rooms.findAndCountAll(options)
    return rooms
  }

  //? Get room by Id
  async getRoomOr404(roomId) {
    let room = await models.Rooms.findByPk(roomId)
    if (!room) throw new CustomError('Not found Room', 404, 'Not Found')
    return room
  }

  //? Create a new Room with details being a admin
  async createRoom(userId, roomData) {
    const transaction = await models.Rooms.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if(user.dataValues.role_id !== 1){
        throw new Error ('Only admins can create New Rooms')
      }
      console.log(roomData.description)
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
          extras: roomData.extras,
        },
        { transaction }
      )

      const roomDetails = await models.Room_Details.create({
        room_id: room.dataValues.id,
        type_room: roomData.num_room.type_room, 
        num_bed: roomData.num_room.num_bed, 
        type_bed: roomData.num_room.type_bed,
        type_bed_2: roomData.num_room.type_bed_2,
        photos: roomData.num_room.photos,
      }, { transaction }
      )
      const roomDetails2 = await models.Room_Details_2.create({
        room_id: room.dataValues.id,
        // photos: roomData.details.photos, 
        amenities: roomData.details.amenities, 
        not_included: roomData.details.not_included,
        services: roomData.details.services,
      }, { transaction }
      )
      await transaction.commit()
      return {room, roomDetails, roomDetails2}
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}


module.exports = RoomService
