'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Countries.hasMany(models.Users, { as: 'Users', foreignKey: 'country_code' })
    }
  }
  Countries.init({
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    code: DataTypes.STRING, 
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'Countries',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['name']
      }
    },
  });
  return Countries;
};