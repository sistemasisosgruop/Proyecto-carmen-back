const RoomsService = require('../services/rooms.services')
const { getPagination } = require('../utils/pagination')
const roomsService = new RoomsService()

class RoomsControllers {
  //? Get All Rooms with Pagination
  async getAllRooms(req, res) {
    const { page, size } = req.query

    try {
      const { limit, offset } = getPagination(page, size)
      const rooms = await roomsService.findAllRooms(limit, offset)
      res.json(rooms)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los Rooms' })
    }
  }

  //? Get room by Id
  async getRoom(req, res) {
    try {
      let { roomId } = req.params
      let room = await roomsService.getRoomOr404(roomId)
      return res.json(room)
    } catch (error) {
      return res.status(404).json({ message: 'Invalid ID' })
    }
  }

  //? Create a new Room with details being a admin
  async postRoom(req, res) {
    const {
      roomType,
      description,
      address,
      price,
      checkIn,
      checkOut,
      numBathrooms,
      numBeds,
      extras,
      numRoom,
      details,
    } = req.body

    try {
      const roomData = {
        roomType,
        description,
        address,
        price,
        checkIn,
        checkOut,
        numBathrooms,
        numBeds,
        extras,
        numRoom,
        details,
      }
      const room = await roomsService.createRoom(roomData)

      return res.status(201).json(room)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          roomType: 'String',
          description: 'Text',
          address: 'String',
          price: 'Number',
          checkIn: 'Date',
          checkOut: 'Date',
          numBathrooms: 'Number',
          numBeds: 'Number',
          extras: '[Strings]',
          details: {
            amenities: '[Strings]',
            notIncluded: '[String]',
            services: '[String]',
          },
          numRoom: {
            typeRoom: 'String',
            numBed: 'Number',
            typeBed: 'String',
            typeBed2: 'String',
          },
        },
      })
    }
  }

  async deleteRoom(req, res) {
    try {
      let { roomId } = req.params
      let room = await roomsService.removeRoom(roomId)
      return res.status(201).json({ results: room, message: 'removed' })
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  async postRoomRating(req, res) {
    const { roomId } = req.params
    const { rate, comment } = req.body

    try {
      const ratingData = {
        rate,
        comment,
      }

      if (!ratingData.rate || !ratingData.comment) {
        throw new Error('All fields are required!')
      }

      const rating = await roomsService.createRoomRating(roomId, ratingData)
      return res.status(201).json(rating)
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        fields: {
          rate: 'Float',
          comment: 'Text',
        },
      })
    }
  }

  async getRatingsByRoom(req, res) {
    const { roomId } = req.params

    try {
      const ratesRoom = await roomsService.findRatingsByRoom(roomId)
      return res.status(200).json(ratesRoom)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = RoomsControllers
