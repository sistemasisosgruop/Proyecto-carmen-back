'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
    static associate(models) {
      Reservations.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });
      Reservations.belongsTo(models.Users, { foreignKey: 'user_id', as: 'Users' });
    }
  }
  Reservations.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    room_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    guest_name: DataTypes.STRING,
    check_in: DataTypes.DATE,
    check_out: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Reservations',
    tableName: 'Reservations',
    underscored: true
  });

  return Reservations;
};
