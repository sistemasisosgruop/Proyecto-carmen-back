'use strict'
const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {

    static associate(models) {
      Tours.hasOne(models.Tour_Info, { foreignKey: 'tour_id', as: 'Tour_Info' });
      Tours.hasOne(models.Tour_Details, { foreignKey: 'tour_id', as: 'Tour_Details' });
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
    // languages: DataTypes.ARRAY(DataTypes.STRING),
    number_of_people: DataTypes.STRING,
    ages: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours',
    underscored: true
  });
  return Tours;
};