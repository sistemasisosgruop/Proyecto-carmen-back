'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {

      Rooms.belongsTo(models.Room_Details, { foreignKey: 'num_rooms', as: 'Room_Details' });
      Rooms.hasMany(models.Reservations, { foreignKey: 'room_id', as: 'Reservations' });
    }
  }
  Rooms.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    room_type: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    price: DataTypes.FLOAT,
    available_dates: DataTypes.JSONB,
    num_bathrooms: DataTypes.INTEGER,
    num_beds: DataTypes.INTEGER,
    num_rooms: {
      type: DataTypes.BIGINT, 
      foreignKey: true
    },
    extras: DataTypes.ARRAY(DataTypes.STRING),
    details: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Rooms',
    tableName: 'Rooms',
    underscored: true
  });

  return Rooms;
};
