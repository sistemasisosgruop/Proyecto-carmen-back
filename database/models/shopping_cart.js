'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoping_Cart extends Model {
    static associate(models) {
      Shoping_Cart.hasMany(models.User_Products, { foreignKey: 'product_id', as: 'User_Products' });
    }
  }
  Shoping_Cart.init({
    user_id: DataTypes.UUID,
    product_id: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    product_type: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    payment_method: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shoping_Cart',
    tableName: 'Shoping_Cart', 
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['product_id', 'product_type', 'quantity', 'paypent_method']
      }
    },
  });
  return Shoping_Cart;
};