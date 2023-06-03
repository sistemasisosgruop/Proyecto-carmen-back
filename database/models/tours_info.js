'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours_Info extends Model {
    
    
    static associate(models) {
      Tours_Info.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' })
    }
  }
  Tours_Info.init({
    tour_id: {
      type: DataTypes.UUID,
      foreignKey: true
    }, 
    images_url: [],
    what_to_do: DataTypes.TEXT,
    good_choise_for: DataTypes.TEXT,
    cancellation_policy: DataTypes.TEXT,
    price_per_person: DataTypes.FLOAT,
    available_dates: DataTypes.ARRAY(DataTypes.STRING),
    schedule: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours_Info',
    tableName: 'Tours_Info'
  });
  return Tours_Info;
};