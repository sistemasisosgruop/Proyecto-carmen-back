'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {

      Rooms.hasMany(models.Room_Details, { foreignKey: 'roomId', as: 'Room_Details' });
      Rooms.hasMany(models.Room_Details_2, { foreignKey: 'roomId', as: 'Room_Details_2' });
      Rooms.hasMany(models.Coupons, { foreignKey: 'roomId', as: 'Coupons' });
      Rooms.hasMany(models.Reservation_Rooms, { foreignKey: 'roomId', as: 'Reservation_Rooms' });
      Rooms.hasMany(models.Ratings, { foreignKey: 'roomId', as: 'Ratings' });
      Rooms.hasMany(models.User_Products, { as: 'User_Products', foreignKey: 'roomId' })
      Rooms.hasMany(models.Room_Images, { as: 'Room_Images', foreignKey: 'roomId' })
    }
  }
  Rooms.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    roomType: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    price: DataTypes.FLOAT,
    checkIn: DataTypes.STRING,
    checkOut: DataTypes.STRING,
    numBathrooms: DataTypes.INTEGER,
    numBeds: DataTypes.INTEGER,
    extras: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Rooms',
    tableName: 'Rooms',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['roomType', 'description', 'address', 'price', 'checkId', 'checkOut', 'numBathrooms', 'numBeds', 'extras']
      }
    },
  });
  return Rooms;
};