'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    
    static associate(models) {
      Ratings.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' });
      Ratings.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' });
    }
  }
  Ratings.init({
    roomId: DataTypes.UUID,
    tourId: DataTypes.UUID,
    rate: DataTypes.FLOAT,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ratings',
    tableName: 'Ratings', 
    underscored: true
  });
  return Ratings;
};