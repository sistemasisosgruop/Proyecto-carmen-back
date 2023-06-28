'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Products extends Model {
    static associate(models) {
      User_Products.belongsTo(models.Rooms, { as: 'Rooms', foreignKey: 'roomId'})
      User_Products.belongsTo(models.Tours, { as: 'Tours', foreignKey: 'tourId'})
      User_Products.belongsTo(models.Shoping_Cart, { as: 'Shoping_Cart', foreignKey: 'cartId'})
    }
  }
  User_Products.init({
    cartId: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    roomId: {
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
    underscored: true, 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['userId', 'roomId', 'tourId']
      }
    },
  });
  return User_Products;
};
