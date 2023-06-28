'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    
    static associate(models) {
      Roles.hasMany(models.Users, { as: 'Users', foreignKey: 'roleId' })
    }
  }
  Roles.init({
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    name: DataTypes.STRING, 
    permissions: DataTypes.JSONB
  }, {
    sequelize,
    sequelize,
    modelName: 'Roles',
    tableName: 'Roles',
    underscored: true,
    timestamps: true,

    scopes: {
      public_view: {
        attributes: ['id', 'name']
      }
    },
  });
  return Roles;
};