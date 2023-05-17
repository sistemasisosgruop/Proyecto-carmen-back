'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tour_Info.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' });
    }
  }
  Tour_Info.init({
    tour_id: {
      type: DataTypes.UUID,
      foreignKey: true
    }, 
    photos: DataTypes.STRING,
    what_to_do: DataTypes.TEXT,
    good_choise_for: DataTypes.TEXT,
    cancellation_policy: DataTypes.TEXT,
    price_per_person: DataTypes.FLOAT,
    available_dates: DataTypes.ARRAY(DataTypes.DATE),
    schedule: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Tour_Info', 
    tableName: 'Tour_Info', 
    underscored: true
  });
  return Tour_Info;
};