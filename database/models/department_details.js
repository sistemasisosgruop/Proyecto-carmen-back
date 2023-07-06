'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department_Details extends Model {
    
    static associate(models) {
      Department_Details.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' })
    }
  }
  Department_Details.init({
    departmentId: {
      type: DataTypes.UUID, 
      foreignKey: true
    },
    amenities: DataTypes.ARRAY(DataTypes.STRING),
    notIncluded: DataTypes.ARRAY(DataTypes.STRING),
    services: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Department_Details',
    tableName: 'departmentDetails',
  });

  return Department_Details;
};
