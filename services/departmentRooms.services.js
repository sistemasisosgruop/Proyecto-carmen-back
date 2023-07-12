const models = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class RoomsService {
  constructor() {}

  async updateRoom(roomId, roomData) {
    const transaction = models.DepartmentRooms.Sequelize.transaction()
    const room = await models.DepartmentRooms.findByPk(roomId)
    try {
      if (!room) throw Error('Room not found')
      const newRoom = room.update(
        {
          typeRoom: roomData.typeRoom,
          numBed: roomData.numBed,
          typeBed: roomData.typeBed,
          numBaths: roomData.numBaths,
        },
        { transaction }
      )
      await transaction.commit()
      return newRoom
    } catch (error) {
      await transaction.rollback()
    }
  }

  async removeRoom(roomId) {
    const transaction = await models.DepartmentRooms.Sequelize.transaction()
    try {
      const room = await models.DepartmentRooms.findByPk(roomId)
      if (!room) throw CustomError('Not found room', 404, 'Not found')
      await room.destroy({ transaction })
      await transaction.commit()
      return room
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
module.exports = RoomsService
