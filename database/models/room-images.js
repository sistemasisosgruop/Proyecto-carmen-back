'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room_Images extends Model {
    static associate(models) {
      Room_Images.belongsTo(models.Rooms, { as: 'Room', foreignKey: 'room_id' })
      // Room_Images.belongsTo(models.Room_Details, { foreignKey: 'room_id'})
      // Room_Images.belongsTo(models.Room_Details_2, { foreignKey: 'room_id'})
    }
  }
  Room_Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      image_url: {
        type: DataTypes.TEXT,
        foreignKey: true,
      },
      room_id: {
        type: DataTypes.UUID,
        foreignKey: true,
      },
      order: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Room_Images',
      tableName: 'Room_Images',
      underscored: true,
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['id', 'image_id', 'room_id'],
        },
      },
    }
  )
  return Room_Images
}
