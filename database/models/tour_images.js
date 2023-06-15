'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour_Images extends Model {
    static associate(models) {
      Tour_Images.belongsTo(models.Tours, { as: 'Tour', foreignKey: 'tour_id' })
    }
  }
  Tour_Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      tour_id: {
        type: DataTypes.UUID,
        foreignKey: true,
      },
      image_url: {
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
      underscored: true,
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['id', 'image_url', 'tour_id'],
        },
      },
    }
  )
  return Tour_Images
}
