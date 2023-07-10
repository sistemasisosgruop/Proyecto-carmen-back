'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Department_Rooms extends Model {
    
    static associate(models) {  
      Department_Rooms.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });   
      Department_Rooms.belongsToMany(models.Images, { through: 'EntityImage', foreignKey: 'roomId' })

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
    numBaths: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Department_Rooms',
    tableName: 'Department_Rooms',
  })

  return Department_Rooms
}