'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class RecoveryPasswords extends Model {
    static associate(models) {
      
    }
  }
  RecoveryPasswords.init({
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
  return RecoveryPasswords
}