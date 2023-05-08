'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.Users, { as: 'Users', foreignKey: 'role_id' })

    }
  }
  Roles.init({
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    sequelize,
    modelName: 'Roles',
    tableName: 'Roles',
    underscored: true,
    timestamps: true,

    scopes: {
      public_view: {
        attributes: ['id', 'role']
      }
    },
  });
  return Roles;
};