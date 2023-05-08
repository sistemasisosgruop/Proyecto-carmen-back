'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Roles, { as: 'Roles', foreignKey: 'role_id' })
      Users.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'country_id' })
    }
  }
  Users.init({  
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    genre: DataTypes.STRING,
    document_type: DataTypes.STRING,
    number_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    student: DataTypes.BOOLEAN,
    country_id: {
      type: DataTypes.INTEGER, 
      foreignKey: true
    },
    role_id: {
      type: DataTypes.INTEGER, 
      foreignKey: true
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'first_name', 'last_name', 'email', 'username', 'password']
      }
    },
  });
  return Users;
};