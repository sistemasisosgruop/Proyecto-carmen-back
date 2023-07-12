'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReservationTours extends Model {
    static associate(models) {
      ReservationTours.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' });
      ReservationTours.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
    }
  }
  ReservationTours.init({
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
    modelName: 'ReservationTours',
    tableName: 'ReservationTours',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['tourId', 'typeTour', 'dateSelected', 'scheduleSelected', 'location', 'purchaseDate', 'purchaseTime', 'numberOfPeople', 'totalPurchase']
      }
    },
  });
  return ReservationTours
}