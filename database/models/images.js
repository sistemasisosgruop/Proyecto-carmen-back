'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {

    static associate(models) {
      Images.belongsToMany(models.Room_Images, { through: 'RoomImages', foreignKey: 'image_id', otherKey: 'room_id' });
    }

  }
  Images.init({
    id: {
      type: DataTypes.UUID,
      primaryKey:true
    },
    image_url: DataTypes.STRING,
    record_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'Images',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['image_url', 'record_id']
      }
    },
  });
  return Images
}