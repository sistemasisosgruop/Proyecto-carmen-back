'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoping_Cart extends Model {
    static associate(models) {
      Shoping_Cart.belongsTo(models.Users, { foreignKey: 'user_id', as: 'Users' })
      // Shoping_Cart.hasMany(models.User_Products, { foreignKey: 'product_id', as: 'User_Products' });
    }
  }
  Shoping_Cart.init({
    id: {
      type: DataTypes.UUID, 
      allowNull: false, 
      primaryKey: true
    },
    user_id: DataTypes.UUID,
    payment_method: DataTypes.STRING,
    total_price: DataTypes.FLOAT,
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