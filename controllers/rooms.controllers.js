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
      return res.json({ results: room })
    } catch (error) {
      return res.status(404).json({ message: 'Invalid ID' })
    }
  }

  //? Create a new Room with details being a admin
  async postRoom(req, res) {
    const {
      room_type,
      description,
      address,
      price,
      check_in,
      check_out,
      num_bathrooms,
      num_beds,
      extras,
      num_room,
      details,
    } = req.body

    try {
      const roomData = {
        room_type,
        description,
        address,
        price,
        check_in,
        check_out,
        num_bathrooms,
        num_beds,
        extras,
        num_room,
        details,
      }
      const room = await roomsService.createRoom(roomData)

      return res.status(201).json(room)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          room_type: 'String',
          description: 'Text',
          address: 'String',
          price: 'Number',
          check_in: 'Date',
          check_out: 'Date',
          num_bathrooms: 'Number',
          num_beds: 'Number',
          extras: '[Strings]',
          details: {
            amenities: '[Strings]',
            not_included: '[String]',
            services: '[String]',
          },
          num_room: {
            type_room: 'String',
            num_bed: 'Number',
            type_bed: 'String',
            type_bed_2: 'String',
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
      return res
        .status(201)
        .json({ message: 'Rate created succesfully', rating })
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
