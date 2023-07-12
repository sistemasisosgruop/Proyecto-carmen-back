const RoomsService = require('../services/departmentRooms.services')

const roomService = new RoomsService()

class RoomsControllers {
  constructor() {}

  async patchRoom(req, res) {
    const { roomId } = req.params
    const { typeRoom, numBed, typeBed, numBaths } = req.body
    try {
      const roomData = {
        typeRoom,
        numBed,
        typeBed,
        numBaths,
      }

      const room = await roomService.updateRoom(roomId, roomData)
      return res.json(room)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  async deleteRoom(req, res) {
    const { roomId } = req.params
    try {
      let department = await roomService.removeRoom(roomId)
      return res.json(department)
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }
}

module.exports = RoomsControllers
