'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {
    
    static associate(models) {
      Tours.hasMany(models.Tours_Info, { foreignKey: 'tour_id', as: 'Tours_Info' });
      Tours.hasMany(models.Tours_Details, { foreignKey: 'tour_id', as: 'Tours_Details' });
      Tours.hasMany(models.Coupons, { foreignKey: 'tour_id', as: 'Coupons' });
      Tours.hasMany(models.Reservation_Tours, { foreignKey: 'room_id', as: 'Reservation_Tours' });
      Tours.hasMany(models.Ratings, { foreignKey: 'tour_id', as: 'Ratings' });
    }
  }
  Tours.init({
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    tour_name: DataTypes.STRING, 
    tour_description: DataTypes.TEXT,
    extras: DataTypes.STRING,
    location: DataTypes.STRING,
    duration: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    languages: DataTypes.ARRAY(DataTypes.STRING),
    number_of_people: DataTypes.STRING,
    ages: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours'
  });
  return Tours;
};