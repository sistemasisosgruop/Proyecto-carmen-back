'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room_Details_2 extends Model {
    
    static associate(models) {  
      Room_Details_2.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });      
    }
  }
  Room_Details_2.init({
    room_id: {
    type: DataTypes.UUID, 
    foreignKey: true
  },
    images_url: DataTypes.ARRAY(DataTypes.STRING),
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
