const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
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
          attributes: ['typeRoom', 'numBed', 'typeBed', 'typeBed2'],
          required: true,
          duplicating: false,
        },
        {
          model: models.Room_Details_2,
          as: 'Room_Details_2',
          attributes: ['amenities', 'notIncluded', 'services'],
          required: true,
          duplicating: false,
        },
        {
          model: models.Room_Images,
          as: 'Room_Images',
          attributes: ['id', 'imageUrl', 'order'],
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

    let roomDetails = await models.Room_Details.findOne({
      where: {
        roomId: roomId,
      },
      attributes: {
        exclude: ['id', 'roomId', 'created_at', 'updated_at'],
      },
    })

    let roomDetails2 = await models.Room_Details_2.findOne({
      where: {
        roomId: roomId,
      },
      attributes: {
        exclude: ['id', 'roomId', 'created_at', 'updated_at'],
      },
    })

    let roomImages = await models.Room_Images.findAll({
      where: {
        roomId: roomId,
      },
      attributes: {
        exclude: ['id', 'roomId', 'created_at', 'updated_at'],
      },
    })

    // Agregar roomDetail y roomDetail2 dentro de room
    room.dataValues.roomDetails = roomDetails
    room.dataValues.roomDetails2 = roomDetails2
    room.dataValues.roomImages = roomImages

    return room
  }

  //? Create a new Room with details being a admin
  async createRoom(roomData) {
    const transaction = await models.Rooms.sequelize.transaction()
    try {
      const room = await models.Rooms.create(
        {
          id: uuid4(),
          roomType: roomData.roomType,
          description: roomData.description,
          address: roomData.address,
          price: roomData.price,
          checkIn: roomData.checkIn,
          checkOut: roomData.checkOut,
          numBathrooms: roomData.numBathrooms,
          numBeds: roomData.numBeds,
          extras: roomData.extras,
        },
        { transaction }
      )

      const roomDetails = await models.Room_Details.create(
        {
          roomId: room.dataValues.id,
          typeRoom: roomData.numRoom.typeRoom,
          numBed: roomData.numRoom.numBed,
          typeBed: roomData.numRoom.typeBed,
          typeBed2: roomData.numRoom.typeBed2,
        },
        { transaction }
      )

      const roomDetails2 = await models.Room_Details_2.create(
        {
          roomId: room.dataValues.id,
          amenities: roomData.details.amenities,
          notIncluded: roomData.details.notIncluded,
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
          roomId: room.id, // Opcional si estás valorando una habitación
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
        roomId: roomId,
      },
    })
    return ratingsRoom
  }
}

module.exports = RoomService
