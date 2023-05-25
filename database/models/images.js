'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {

    static associate(models) {
      Images.belongsToMany(models.Room_Images, { through: 'RoomImages', foreignKey: 'image_id', otherKey: 'room_id' });
      // Images.belongsTo(models.Room_Details, { foreignKey: 'image:_id', as: 'Room_Details'});
      // Images.belongsTo(models.Room_Details_2, { foreignKey: 'image_id', as: 'Room_Details_2' });
    }

  }
  Images.init({
    id: {
      type: DataTypes.UUID,
      primaryKey:true
    },
    image_url: DataTypes.STRING,
    record_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Images',
    tableName: 'Images'
  });
  return Images;
};