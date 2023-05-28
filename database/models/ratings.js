'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    
    static associate(models) {
      Ratings.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });
      Ratings.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' });
    }
  }
  Ratings.init({
    room_id: DataTypes.UUID,
    tour_id: DataTypes.UUID,
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