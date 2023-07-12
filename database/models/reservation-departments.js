'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReservationDepartments extends Model {
    static associate(models) {
      ReservationDepartments.belongsTo(models.ReservationDepartments, { foreignKey: 'departmentId', as: 'ReservationDepartments' });
      ReservationDepartments.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
    }
  }
  ReservationDepartments.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    departmentId: DataTypes.UUID,
    typeDepartment: DataTypes.STRING,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE,
    address: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    purchaseTime: DataTypes.DATE,
    numberOfPeople: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'ReservationDepartments',
    tableName: 'reservationDepartments',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'userId', 'departmentId', 'typeDepartment', 'checkIn', 'checkOut', 'address', 'purchaseDate', 'purchaseTime', 'numberOfPeople', 'totalPrice' ]
      }
    },
  });
  return ReservationDepartments;
};