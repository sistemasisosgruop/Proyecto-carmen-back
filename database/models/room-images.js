'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room_Images extends Model {
    static associate(models) {
      Room_Images.belongsTo(models.Rooms, { as: 'Room', foreignKey: 'roomId' })
    }
  }
  Room_Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      roomId: {
        type: DataTypes.UUID,
        foreignKey: true,
      },
      imageUrl: {
        type: DataTypes.TEXT,
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
          attributes: ['id', 'imageUrl', 'roomId'],
        },
      },
    }
  )
  return Room_Images
}
