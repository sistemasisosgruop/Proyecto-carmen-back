'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation_Rooms extends Model {
    static associate(models) {
      Reservation_Rooms.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });
      Reservation_Rooms.belongsTo(models.Users, { foreignKey: 'user_id', as: 'Users' });
    }
  }
  Reservation_Rooms.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    room_id: DataTypes.UUID,
    type_room: DataTypes.STRING,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    address: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    purchase_time: DataTypes.DATE,
    number_of_people: DataTypes.INTEGER,
    price_for_night: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Reservation_Rooms',
    tableName: 'Reservation_Rooms',
    underscored: true
  });

  return Reservation_Rooms;
};
