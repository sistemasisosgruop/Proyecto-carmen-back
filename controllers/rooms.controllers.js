const RoomsService = require('../services/rooms.services')

const roomsService = new RoomsService()

const postRoom = async (req, res) => {
  const userId = req.user.id
  const { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, num_room } = req.body

  try {
    const room = await roomsService.createRoom(userId, { room_type, description, address, price, check_in, check_out, num_bathrooms, num_beds, num_room })
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
        'num_room': {
          'type_room': 'String',
          'num_bed': 'Number',
          'type_bed': 'String',
          'type_bed_2': 'String',
          'Photos': 'String',
        },
      },
    })
  }
}

module.exports = {
  postRoom,
}
