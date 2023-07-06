'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation_Departments extends Model {
    static associate(models) {
      Reservation_Departments.belongsTo(models.Reservation_Departments, { foreignKey: 'departmentId', as: 'DeReservation_Departments' });
      Reservation_Departments.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
    }
  }
  Reservation_Departments.init({
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
    modelName: 'Reservation_Departments',
    tableName: 'reservationDepartments',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'userId', 'departmentId', 'typeDepartment', 'checkIn', 'checkOut', 'address', 'purchaseDate', 'purchaseTime', 'numberOfPeople', 'totalPrice' ]
      }
    },
  });
  return Reservation_Departments;
};