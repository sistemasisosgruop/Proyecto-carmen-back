'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Details extends Model {
    
    static associate(models) {
      // Room_Details.hasMany(models.Images, { foreignKey: 'image:_id', as: 'Room_Details' });
      Room_Details.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' })
    }
  }
  Room_Details.init({
    room_id: {
      type: DataTypes.UUID, 
      foreignKey: true
    },
    type_room: DataTypes.STRING,
    num_bed: DataTypes.INTEGER,
    type_bed: DataTypes.STRING,
    type_bed_2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room_Details',
    tableName: 'Room_Details',
    underscored: true
  });

  return Room_Details;
};
