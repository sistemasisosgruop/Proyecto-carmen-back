'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ratings extends Model {
    
    static associate(models) {
      Ratings.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });
      Ratings.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' });
    }
  }
  Ratings.init({
    departmentId: DataTypes.UUID,
    tourId: DataTypes.UUID,
    rate: DataTypes.FLOAT,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Ratings',
    tableName: 'Ratings', 
  });
  return Ratings;
};