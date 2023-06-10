'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    
    static associate(models) {
      Coupons.belongsTo(models.Rooms, { foreignKey: 'room_id', as: 'Rooms' });
      Coupons.belongsTo(models.Tours, { foreignKey: 'tour_id', as: 'Tours' });
    }
  }
  Coupons.init({
    id: {
      primaryKey:true,
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4
    },
    coupon_code: DataTypes.STRING,
    discount: DataTypes.FLOAT,
    room_id: DataTypes.UUID, 
    tour_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Coupons',
    tableName: 'Coupons', 
    underscored: true, 
    timestamps: true, 
    scopes:{
      public_view: {
        attributes: ['coupon_code', 'discount', 'room_id', 'tour_id']
      }
    }
  });
  return Coupons;
};