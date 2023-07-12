'use strict'
const {
  Model, Sequelize
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DepartmentRooms extends Model {
    
    static associate(models) {  
      DepartmentRooms.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });   
      DepartmentRooms.belongsToMany(models.Images, { through: 'EntityImages', foreignKey: 'roomId', as: 'Images'})

    }
  }
  DepartmentRooms.init({
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
    modelName: 'DepartmentRooms',
    tableName: 'DepartmentRooms',
  })

  return DepartmentRooms
}