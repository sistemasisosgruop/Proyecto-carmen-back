'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {

      Rooms.hasMany(models.Room_Details, { foreignKey: 'room_id', as: 'Room_Details' });
      Rooms.hasMany(models.Room_Details_2, { foreignKey: 'room_id', as: 'Room_Details_2' });
      Rooms.hasMany(models.Coupons, { foreignKey: 'room_id', as: 'Coupons' });
      Rooms.hasMany(models.Reservation_Rooms, { foreignKey: 'room_id', as: 'Reservation_Rooms' });
      Rooms.hasMany(models.Ratings, { foreignKey: 'room_id', as: 'Ratings' });
      Rooms.hasMany(models.User_Products, { as: 'User_Products', foreignKey: 'room_id' })
      Rooms.hasMany(models.Room_Images, { as: 'Room_Images', foreignKey: 'room_id' })
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
    check_in: DataTypes.STRING,
    check_out: DataTypes.STRING,
    num_bathrooms: DataTypes.INTEGER,
    num_beds: DataTypes.INTEGER,
    extras: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Rooms',
    tableName: 'Rooms',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['room_type', 'description', 'address', 'price', 'check_id', 'check_out', 'num_bathrooms', 'num_beds', 'extras']
      }
    },
  });
  return Rooms;
};