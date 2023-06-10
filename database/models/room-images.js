'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Images extends Model {

    static associate(models) {
      Room_Images.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Room_Images'});
      // Room_Images.belongsToMany(models.Images, { through: 'RoomImages', foreignKey: 'room_id', otherKey: 'image_id' });
      // Room_Images.hasMany(models.Images, { foreignKey: 'room:_id', as: 'RoomImages' });
      Room_Images.belongsTo(models.Room_Details, { foreignKey: 'room_id'})
      Room_Images.belongsTo(models.Room_Details_2, { foreignKey: 'room_id'})
    }
  }
  Room_Images.init({
    id: {
    type: DataTypes.UUID, 
    primaryKey: true
  },
  image_id: {
    type: DataTypes.UUID, 
    foreignKey: true
  }, 
  room_id: {
    type: DataTypes.UUID, 
    foreignKey: true
  }
  }, {
    sequelize,
    modelName: 'Room_Images',
    tableName: 'Room_Images',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['image_id', 'room_id']
      }
    },
  });
  return Room_Images;
};