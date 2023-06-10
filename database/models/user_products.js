'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Products extends Model {
    static associate(models) {
      User_Products.belongsTo(models.Users, { as: 'Users', foreignKey: 'user_id'})
      User_Products.belongsTo(models.Rooms, { as: 'Rooms', foreignKey: 'room_id'})
      User_Products.belongsTo(models.Tours, { as: 'Tours', foreignKey: 'tour_id'})
    }
  }
  User_Products.init({
    user_id: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    room_id: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    tour_id: {
      type: DataTypes.UUID,
      foreignKey: true
    }
  }, {
    sequelize,
    modelName: 'User_Products',
    tableName: 'User_Products', 
    underscored: true, 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['user_id', 'room_id', 'tour_id']
      }
    },
  });
  return User_Products;
};
