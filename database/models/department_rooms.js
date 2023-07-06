'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Department_Rooms extends Model {
    
    static associate(models) {  
      Department_Rooms.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });   
    }
  }
  Department_Rooms.init({
    departmentId: {
    type: DataTypes.UUID, 
    foreignKey: true
  },
    typeRoom: DataTypes.STRING,
    numBed: DataTypes.INTEGER,
    typeBed: DataTypes.ARRAY(DataTypes.STRING),
    numBathrooms: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Department_Rooms',
    tableName: 'departmentRooms',
  })

  return Department_Rooms
}