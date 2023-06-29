'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoping_Cart extends Model {
    static associate(models) {
      Shoping_Cart.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
      Shoping_Cart.hasMany(models.User_Products, { foreignKey: 'cartId', as: 'User_Products' });
    }
  }
  Shoping_Cart.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    totalPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Shoping_Cart',
    tableName: 'Shoping_Cart',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['userId', 'totalPrice']
      }
    },
  });
  return Shoping_Cart;
};
