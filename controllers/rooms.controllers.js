const RoomsService = require('../services/rooms.services')
const { getPagination, getPagingData } = require('../utils/pagination')
const models = require('../database/models')
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
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

//? Get room by Id
const getRoom = async (req, res) => {
  try {
    let { roomId } = req.params
    let room = await roomsService.getRoomOr404(roomId)
    return res.json({ results: room })
  } catch (error) {
    return res.status(404).json({ message: 'Invalid ID' })
  }
}

//? Create a new Room with details being a admin
const postRoom = async (req, res) => {
  const userId = req.user.id
  const files = req.files
  const { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, extras, num_room, details } = req.body

  try {
    const photos = files.slice(0, 10).map((file) => ({
      fieldname: file.fieldname,
      originalname: file.originalname,
      mimetype: file.mimetype,
      filename: file.filename,
      path: file.path,
    }))

    const room = await roomsService.createRoom( userId, { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, extras, num_room, details }, photos)

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
          photos: '[Strings]',
          amenities: '[Strings]',
          not_included: '[String]',
          services: '[String]',
        },
        num_room: {
          type_room: 'String',
          num_bed: 'Number',
          type_bed: 'String',
          type_bed_2: 'String',
          photos: 'String',
        },
      },
    })
  }
}


const postRoomRating = async (req, res) => {
  const userId = req.user.id
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

    const rating = await roomsService.createRoomRating(
      userId,
      roomId,
      ratingData
    )
    return res.status(201).json({ message: 'Rate created succesfully', rating })
  } catch (error) {
    return res.status(400).json({ message: error.message, fields: {
      'rate': 'Float', 
      'comment': 'Text'
    } })
  }
}


const getRatingsByRoom = async(req, res) => {
  const { roomId } = req.params

  try {
    const ratesRoom = await roomsService.findRatingsByRoom(roomId)
    return res.status(200).json(ratesRoom)
  } catch (error) {
    return res.status(401).json({message: error.message})
  }
}


// // Controlador para obtener los 10 elementos mejor valorados
// const getTopRated = async(req, res) => {
//   try {
//     const topRated = await models.Ratings.findAll({
//       order: ['rate', 'DESC'],
//       limit: 10
//     });

//     // Los 10 elementos mejor valorados se han obtenido con éxito
//     return res.status(200).json({
//       success: true,
//       message: 'Los 10 elementos mejor valorados',
//       data: topRated
//     });
//   } catch (error) {
//     // Error al obtener los 10 elementos mejor valorados
//     return res.status(500).json({
//       success: false,
//       message: 'Error al obtener los 10 elementos mejor valorados',
//       error: error.message
//     });
//   }
// }

module.exports = {
  getAllRooms,
  getRoom ,
  postRoom,
  postRoomRating,
  getRatingsByRoom
}
