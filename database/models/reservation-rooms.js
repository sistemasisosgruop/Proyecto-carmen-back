'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation_Rooms extends Model {
    static associate(models) {
      Reservation_Rooms.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' });
      Reservation_Rooms.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
    }
  }
  Reservation_Rooms.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    roomId: DataTypes.UUID,
    typeRoom: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    address: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    purchaseTime: DataTypes.DATE,
    numberOfPeople: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Reservation_Rooms',
    tableName: 'Reservation_Rooms',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'userId', 'roomId', 'typeRoom', 'checkIn', 'checkOut', 'address', 'purchaseDate', 'purchaseTime', 'numberOfPeople', 'totalPrice' ]
      }
    },
  });
  return Reservation_Rooms;
};