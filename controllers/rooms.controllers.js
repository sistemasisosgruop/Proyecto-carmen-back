const RoomsService = require('../services/rooms.services')
const { getPagination, getPagingData } = require('../utils/pagination')

const roomsService = new RoomsService()

//? Get All Rooms with Pagination
const getAllRooms = async (req, res) => {
  try {
    let query = req.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let rooms = await roomsService.findAndCount(query)
    const results = getPagingData(rooms, page, limit)
    return res.json({ results: results })
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized'})
  }
}

//? Get room by Id
const getRoom = async (req, res) => {
  try {
    let { roomId } = req.params
    let room = await roomsService.getRoomOr404(roomId)
    return res.json({ results: room })
  } catch (error) {
    return res.status(404).json({message: 'Invalid ID'})
  }
}

//? Create a new Room with details being a admin
const postRoom = async (req, res) => {
  const userId = req.user.id
  const { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, extras, num_room, details } = req.body

  try {
    const room = await roomsService.createRoom(userId, { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, extras, num_room, details })
    res.status(201).json(room)
  } catch (error) {
    res.status(401).json({
      message: error.message,
      fields: {
        'room_type': 'String',
        'description': 'Text',
        'address': 'String',
        'price': 'Number',
        'check_in': 'Date',
        'check_out': 'Date',
        'num_bathrooms': 'Number',
        'num_beds': 'Number',
        'extras': '[Strings]',
        'details': {
          'photos': '[Strings]', 
          'amenities': '[Strings]',
          'not_included': '[String]',
          'services': '[String]'
        },
        'num_room': {
          'type_room': 'String',
          'num_bed': 'Number',
          'type_bed': 'String',
          'type_bed_2': 'String',
          'photos': 'String',
        },
      },
    })
  }
}

module.exports = {
  getAllRooms,
  getRoom,
  postRoom,
}
