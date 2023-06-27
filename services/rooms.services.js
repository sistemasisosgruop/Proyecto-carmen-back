const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
require('dotenv').config()
class RoomService {
  constructor() {}

  //? Get All Rooms with pagination
  async findAllRooms(limit, offset) {
    const rooms = await models.Rooms.findAndCountAll({
      limit,
      offset,
      distinct: true, // Esta opción es para obtener conteo de habitaciones distintas y no todos los models
      include: [
        {
          model: models.Room_Details,
          as: 'Room_Details',
          attributes: ['type_room', 'num_bed', 'type_bed', 'type_bed_2'],
          required: true,
          duplicating: false,
        },
        {
          model: models.Room_Details_2,
          as: 'Room_Details_2',
          attributes: ['amenities', 'not_included', 'services'],
          required: true,
          duplicating: false,
        },
        {
          model: models.Room_Images,
          as: 'Room_Images',
          attributes: ['id', 'image_url', 'order'],
          required: false,
        },
      ],
      attributes: {
        exclude: ['created_at', 'updated_at'],
      },
      raw: true,
      nest: true,
    })

    const { count, rows: results } = rooms
    const totalPages = Math.ceil(count / limit)

    // Agrupar las imágenes por la habitación
    const groupedResults = results.reduce((acc, room) => {
      const roomId = room.id
      if (!acc[roomId]) {
        acc[roomId] = {
          ...room,
          Room_Images: [],
        }
      }
      if (room.Room_Images.id) {
        acc[roomId].Room_Images.push(room.Room_Images)
      }
      return acc
    }, {})

    // Convertir el objeto en un array de resultados
    const finalResults = Object.values(groupedResults)

    return { count, totalPages, results: finalResults }
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

    // Agregar roomDetail y roomDetail2 dentro de room
    room.dataValues.roomDetail = roomDetail
    room.dataValues.roomDetail2 = roomDetail2

    return { room }
  }

  //? Create a new Room with details being a admin
  async createRoom(roomData) {
    const transaction = await models.Rooms.sequelize.transaction()
    try {
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
  async createRoomRating(roomId, ratingData) {
    const transaction = await models.Ratings.sequelize.transaction()
    const room = await models.Rooms.findByPk(roomId)

    try {
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
