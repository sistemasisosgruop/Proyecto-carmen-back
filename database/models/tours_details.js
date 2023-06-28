'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours_Details extends Model {
  
    static associate(models) {
      Tours_Details.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' })
    }
  }
  Tours_Details.init({
    tourId: {
      type: DataTypes.UUID,
      foreignKey: true,
    },
    whatIsIncluded: DataTypes.TEXT,
    whatIsNotIncluded: DataTypes.TEXT,
    itinerary: DataTypes.ARRAY(DataTypes.STRING),
    departureDetails: DataTypes.STRING,
    returnDetails: DataTypes.STRING,
    accessibility: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Tours_Details',
    tableName: 'Tours_Details',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['whatIsIncluded', 'whatIsNotIncluded', 'itinerary', 'departureDetails', 'returnDetails', 'accessibility']
      }
    },
  });
  return Tours_Details;
};