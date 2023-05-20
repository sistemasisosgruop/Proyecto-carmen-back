'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room_Details_2 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room_Details_2.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });
      Room_Details_2.hasMany(models.Images, {foreignKey: 'record_id', as: 'Images'});
    }
  }
  Room_Details_2.init({
    room_id: {
    type: DataTypes.UUID, 
    foreignKey: true
  },
    photos: DataTypes.ARRAY(DataTypes.STRING),
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    not_included: DataTypes.ARRAY(DataTypes.STRING),
    services: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Room_Details_2',
    tableName: 'Room_Details_2',
    underscored: true
  })

  return Room_Details_2
}
