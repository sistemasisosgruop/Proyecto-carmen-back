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
    userId: DataTypes.UUID,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RecoveryPasswords',
    tableName: 'RecoveryPasswords',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['used']
      }
    },
  });
  return Recovery_Passwords
}