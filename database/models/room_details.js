'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Details extends Model {
    
    static associate(models) {
      Room_Details.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' })
    }
  }
  Room_Details.init({
    roomId: {
      type: DataTypes.UUID, 
      foreignKey: true
    },
    typeRoom: DataTypes.STRING,
    numBed: DataTypes.INTEGER,
    typeBed: DataTypes.STRING,
    typeBed_2: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Room_Details',
    tableName: 'Room_Details',
    underscored: true
  });

  return Room_Details;
};
