'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopingCart extends Model {
    static associate(models) {
      ShopingCart.belongsTo(models.Users, { foreignKey: 'userId', as: 'Users' });
      ShopingCart.hasMany(models.UserProducts, { foreignKey: 'cartId', as: 'UserProducts' });
    }
  }
  ShopingCart.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    userId: DataTypes.UUID,
    totalPrice: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'ShopingCart',
    tableName: 'ShopingCart',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['userId', 'totalPrice']
      }
    },
  });
  return ShopingCart;
};
