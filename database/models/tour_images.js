'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour_Images extends Model {
    static associate(models) {
      Tour_Images.belongsTo(models.Tours, { as: 'Tour', foreignKey: 'tourId' })
    }
  }
  Tour_Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tourId: {
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
      modelName: 'Tour_Images',
      tableName: 'Tour_Images',
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['id', 'imageUrl', 'tourId'],
        },
      },
    }
  )
  return Tour_Images
}
