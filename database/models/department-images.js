'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Department_Images extends Model {
    static associate(models) {
      Department_Images.belongsTo(models.Departments, { as: 'Departments', foreignKey: 'departmentId' })
    }
  }
  Department_Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      departmentId: {
        type: DataTypes.UUID,
        foreignKey: true,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        foreignKey: true,
      },
      order: {
        type: DataTypes.INTEGER,
        foreignKey: true,
      },
    },
    {
      sequelize,
      modelName: 'Department_Images',
      tableName: 'departmentImages',
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['id', 'imageUrl', 'departmentId'],
        },
      },
    }
  )
  return Department_Images
}
