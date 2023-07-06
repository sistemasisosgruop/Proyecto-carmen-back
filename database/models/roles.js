'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.Users, { as: 'Users', foreignKey: 'roleId' })
    }
  }
  Roles.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      permissions: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      sequelize,
      modelName: 'Roles',
      tableName: 'Roles',
      timestamps: true,

      scopes: {
        public_view: {
          attributes: ['id', 'name'],
        },
      },
    }
  )
  return Roles
}
