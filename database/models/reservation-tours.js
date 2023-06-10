'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reservation_Tours extends Model {
    static associate(models) {
      Reservation_Tours.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' });
      Reservation_Tours.belongsTo(models.Users, { foreignKey: 'user_id', as: 'Users' });
    }
  }
  Reservation_Tours.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    tour_id: DataTypes.UUID,
    type_tour: DataTypes.STRING,
    date_selected: DataTypes.ARRAY(DataTypes.DATE),
    schedule_selected: DataTypes.STRING,
    location: DataTypes.STRING,
    purchase_date: DataTypes.DATE,
    purchase_time: DataTypes.DATE,
    number_of_people: DataTypes.INTEGER,
    total_purchase: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Reservation_Tours',
    tableName: 'Reservation_Tours',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['tour_id', 'type_tour', 'date_selected', 'schedule_selected', 'location', 'purchase_date', 'purchase_time', 'number_of_people', 'total_purchase']
      }
    },
  });
  return Reservation_Tours
}