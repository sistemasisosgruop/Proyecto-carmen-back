'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation_Tours extends Model {
    static associate(models) {
      Reservation_Tours.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' });
      Reservation_Tours.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
    }
  }
  Reservation_Tours.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    tourId: DataTypes.UUID,
    typeTour: DataTypes.STRING,
    dateSelected: DataTypes.ARRAY(DataTypes.DATE),
    scheduleSelected: DataTypes.STRING,
    location: DataTypes.STRING,
    purchaseDate: DataTypes.DATE,
    purchaseTime: DataTypes.DATE,
    numberOfPeople: DataTypes.INTEGER,
    totalPurchase: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reservation_Tours',
    tableName: 'Reservation_Tours',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['tourId', 'typeTour', 'dateSelected', 'scheduleSelected', 'location', 'purchaseDate', 'purchaseTime', 'numberOfPeople', 'totalPurchase']
      }
    },
  });
  return Reservation_Tours
}