'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProducts extends Model {
    static associate(models) {
      UserProducts.belongsTo(models.Departments, { as: 'Departments', foreignKey: 'departmentId'})
      UserProducts.belongsTo(models.Tours, { as: 'Tours', foreignKey: 'tourId'})
      UserProducts.belongsTo(models.ShopingCart, { as: 'ShopingCart', foreignKey: 'cartId'})
    }
  }
  UserProducts.init({
    cartId: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    departmentId: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    tourId: {
      type: DataTypes.UUID,
      foreignKey: true
    }, 
    quantity: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'UserProducts',
    tableName: 'UserProducts', 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['userId', 'departmentId', 'tourId']
      }
    },
  });
  return UserProducts;
};
