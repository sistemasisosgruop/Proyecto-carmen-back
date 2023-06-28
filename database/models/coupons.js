'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    
    static associate(models) {
      Coupons.belongsTo(models.Rooms, { foreignKey: 'roomId', as: 'Rooms' });
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
    roomId: DataTypes.UUID, 
    tourId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Coupons',
    tableName: 'Coupons', 
    underscored: true, 
    timestamps: true, 
    scopes:{
      public_view: {
        attributes: ['couponCode', 'discount', 'roomId', 'tourId']
      }
    }
  });
  return Coupons;
};