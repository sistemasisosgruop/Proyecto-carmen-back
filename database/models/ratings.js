'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ratings extends Model {
    
    static associate(models) {
      // define association here
    }
  }
  ratings.init({
    product_id: DataTypes.UUID,
    product_type: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ratings',
  });
  return ratings;
};