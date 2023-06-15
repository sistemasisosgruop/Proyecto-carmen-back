const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
require('dotenv').config()
class RoomService {
  constructor() {}

  //? Get All Rooms with pagination
  async findAllRooms() {
    const rooms = await models.Rooms.findAll({
      include: [
        {
          model: models.Room_Details,
          as: 'Room_Details',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
        {
          model: models.Room_Details_2,
          as: 'Room_Details_2',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
        {
          model: models.Room_Images,
          as: 'Room_Images',
          attributes: { exclude: ['created_at', 'updated_at'] },
        },
      ],
    })
    const transformedRooms = rooms.map((room) => {
      const { Room_Details, Room_Details_2, Room_Images, ...rest } =
        room.toJSON()

      const transformedRoomDetails = Room_Details
        ? { ...Room_Details[0], id: undefined, room_id: undefined }
        : null

      const transformedRoomDetails2 = Room_Details_2
        ? { ...Room_Details_2[0], id: undefined, room_id: undefined }
        : null

      const transformedRoomImages = Room_Images.map((image) => {
        const { id, room_id, ...imageData } = image
        return imageData
      })

      return {
        ...rest,
        Room_Details: transformedRoomDetails,
        Room_Details_2: transformedRoomDetails2,
        Room_Images: transformedRoomImages,
      }
    })

    return transformedRooms
  }
  catch(error) {
    console.error('Error al obtener los rooms:', error)
    throw new Error('Ocurrió un error al obtener los rooms')
  }

  //? Get room by Id
  async getRoomOr404(roomId) {
    let room = await models.Rooms.findByPk(roomId)
    if (!room) throw new CustomError('Not found Room', 404, 'Not Found')
    let roomDetail = await models.Room_Details.findOne({
      where: {
        room_id: roomId,
      },
      attributes: {
        exclude: ['id', 'room_id', 'created_at', 'updated_at'],
      },
    })
    let roomDetail2 = await models.Room_Details_2.findOne({
      where: {
        room_id: roomId,
      },
      attributes: {
        exclude: ['id', 'room_id', 'created_at', 'updated_at'],
      },
    })
    return { room, roomDetail, roomDetail2 }
  }

  //? Create a new Room with details being a admin
  async createRoom(userId, roomData) {
    const transaction = await models.Rooms.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if (user.dataValues.role_id !== 1) {
        throw new Error('Only admins can create New Rooms')
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
          extras: roomData.extras,
        },
        { transaction }
      )

      const roomDetails = await models.Room_Details.create(
        {
          room_id: room.dataValues.id,
          type_room: roomData.num_room.type_room,
          num_bed: roomData.num_room.num_bed,
          type_bed: roomData.num_room.type_bed,
          type_bed_2: roomData.num_room.type_bed_2,
        },
        { transaction }
      )

      const roomDetails2 = await models.Room_Details_2.create(
        {
          room_id: room.dataValues.id,
          amenities: roomData.details.amenities,
          not_included: roomData.details.not_included,
          services: roomData.details.services,
        },
        { transaction }
      )

      await transaction.commit()
      return { room, roomDetails, roomDetails2 }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeRoom(roomId) {
    const transaction = await models.Rooms.sequelize.transaction()
    try {
      let room = await models.Rooms.findByPk(roomId)

      if (!room) throw new CustomError('Not found room', 404, 'Not Found')

      await room.destroy({ transaction })
      await transaction.commit()
      return room
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  // Función para crear una nueva valoración y comentario
  async createRoomRating(userId, roomId, ratingData) {
    const transaction = await models.Ratings.sequelize.transaction()
    const user = await models.Users.findByPk(userId)
    const room = await models.Rooms.findByPk(roomId)

    try {
      if (!user) {
        throw new Error('Only users can rate rooms')
      }
      const rating = await models.Ratings.create(
        {
          id: uuid4(),
          room_id: room.id, // Opcional si estás valorando una habitación
          rate: ratingData.rate,
          comment: ratingData.comment,
        },
        { transaction }
      )
      await transaction.commit()
      return rating
    } catch (error) {
      await transaction.rollback()
      // Error al crear la valoración y comentario
      throw error
    }
  }

  async findRatingsByRoom(roomId) {
    const ratingsRoom = await models.Ratings.findAll({
      where: {
        room_id: roomId,
      },
    })
    return ratingsRoom
  }
}

module.exports = RoomService
