'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    
    static associate(models) {
      Coupons.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });
      Coupons.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' });
    }
  }
  Coupons.init({
    id: {
      primaryKey:true,
      type: DataTypes.UUID, 
    },
    couponCode: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    departmentId: DataTypes.UUID, 
    tourId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Coupons',
    tableName: 'Coupons', 
    timestamps: true, 
    scopes:{
      public_view: {
        attributes: ['couponCode', 'discount', 'departmentId', 'tourId']
      }
    }
  });
  return Coupons;
};