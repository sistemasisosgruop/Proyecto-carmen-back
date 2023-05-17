'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour_Details.belongsTo(models.Tours, {
        foreignKey: 'tourId',
        as: 'Tours',
      })
    }
  }
  Tour_Details.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Tour_Details',
      tableName: 'Tour_Details',
      underscored: true,
    }
  )
  return Tour_Details
}
