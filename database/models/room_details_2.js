'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Room_Details_2 extends Model {
    
    static associate(models) {  
      Room_Details_2.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' });   
    }
  }
  Room_Details_2.init({
    roomId: {
    type: DataTypes.UUID, 
    foreignKey: true
  },
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    notIncluded: DataTypes.ARRAY(DataTypes.STRING),
    services: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Room_Details_2',
    tableName: 'Room_Details_2',
  })

  return Room_Details_2
}