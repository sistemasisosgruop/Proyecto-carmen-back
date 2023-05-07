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
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    genre: DataTypes.STRING,
    document_type: DataTypes.STRING,
    number_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthday: DataTypes.DATE,
    student: DataTypes.BOOLEAN,
    country_id: DataTypes.INTEGER, 
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};