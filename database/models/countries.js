'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    static associate(models) {
      Countries.hasMany(models.Users, {
        as: 'Users',
        foreignKey: 'countryCode',
      })
    }
  }
  Countries.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      code: DataTypes.STRING,
      country: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Countries',
      tableName: 'Countries',
      underscored: true,
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['countrys'],
        },
      },
    }
  )
  return Countries
}
