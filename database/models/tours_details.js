'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours_Details extends Model {
  
    static associate(models) {
      Tours_Details.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' })
    }
  }
  Tours_Details.init({
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    tour_id: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
    what_is_included: DataTypes.TEXT,
    what_is_not_included: DataTypes.TEXT,
    itinerary: DataTypes.ARRAY(DataTypes.STRING),
    departure_details: DataTypes.STRING,
    return_details: DataTypes.STRING,
    accessibility: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Tours_Details',
    tableName: 'Tours_Details'
  });
  return Tours_Details;
};