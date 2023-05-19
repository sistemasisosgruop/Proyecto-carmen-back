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
      Users.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'country_code' })
    }
  }
  Users.init({  
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    genre: DataTypes.STRING,
    phone_number: DataTypes.BIGINT,
    country_code: {
      type: DataTypes.STRING, 
      foreignKey: true
    },
    document_type: DataTypes.STRING,
    document_number: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    student: DataTypes.BOOLEAN,
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
        attributes: ['id', 'first_name', 'last_name', 'email', 'genre', 'phone_number', 'country_code', 'document_type', 'document_number', 'birthday', 'student', 'role_id' ]
      }
    },
  });
  return Users;
};