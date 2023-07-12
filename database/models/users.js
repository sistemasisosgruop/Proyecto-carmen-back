'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    
    static associate(models) {
      Users.belongsTo(models.Roles, { as: 'Roles', foreignKey: 'roleId' })
      Users.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'countryCode' })
      Users.hasOne(models.ShopingCart, { as: 'ShopingCart', foreignKey: 'userId' })
    }
  }
  Users.init({  
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    genre: DataTypes.STRING,
    phoneNumber: DataTypes.BIGINT,
    countryCode: {
      type: DataTypes.STRING, 
      foreignKey: true
    },
    documentType: DataTypes.STRING,
    documentNumber: DataTypes.INTEGER,
    birthday: DataTypes.DATE,
    student: DataTypes.BOOLEAN,
    roleId: {
      type: DataTypes.INTEGER, 
      foreignKey: true
    }
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'firstName', 'lastName', 'email', 'genre', 'phoneNumber', 'countryCode', 'documentType', 'documentNumber', 'birthday', 'student', 'roleId' ]
      }
    },
  });
  return Users;
};