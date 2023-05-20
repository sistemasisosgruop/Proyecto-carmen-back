'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Images.belongsTo(models.Room_Details, { foreignKey: 'record_id', as: 'Room_Details' });
      Images.belongsTo(models.Room_Details_2, { foreignKey: 'record_id', as: 'Room_Details_2' });
    }
    
  }
  Images.init({
    image_url: DataTypes.STRING,
    description: DataTypes.TEXT,
    record_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'Images'
  });
  return Images;
};