'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Recovery_Passwords extends Model {
    static associate(models) {
      
    }
  }
  Recovery_Passwords.init({
    user_id: DataTypes.UUID,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Recovery_Passwords',
    tableName: 'Recovery_Passwords',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['used']
      }
    },
  });
  return Recovery_Passwords
}