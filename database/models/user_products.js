'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Products extends Model {
    static associate(models) {
      User_Products.belongsTo(models.Departments, { as: 'Departments', foreignKey: 'departmentId'})
      User_Products.belongsTo(models.Tours, { as: 'Tours', foreignKey: 'tourId'})
      User_Products.belongsTo(models.Shoping_Cart, { as: 'Shoping_Cart', foreignKey: 'cartId'})
    }
  }
  User_Products.init({
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
    modelName: 'User_Products',
    tableName: 'User_Products', 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['userId', 'departmentId', 'tourId']
      }
    },
  });
  return User_Products;
};
