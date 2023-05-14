const RoomsService = require('../services/rooms.services')

const roomsService = new RoomsService()

const postRoom = async (req, res) => {
  const  userId  = req.user.id
  const { roomData } = req.body
  
  console.log(roomData)

  try {
    const room = await roomsService.createRoom(userId, {roomData})
    res.status(201).json(room)
  } catch (error) {
    res.status(401).json({ message: error.message, fields: {
      'room_type': 'String',
      'description': 'Text',
      'address': 'String',
      'price': 'Number',
      'check_in': 'Date',
      'check_out': 'Date',
      'num_bathrooms': 'Number',
      'num_beds': 'Number',
      'num_rooms': 'BigInt',
      'extras': 'Array[String]',
      'details': 'String',
    } })
  }
}

module.exports = {
  postRoom
}
