const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    static associate(models) {
      Images.belongsToMany(models.Departments, {
        through: 'EntityImages',
        foreignKey: 'imageId',
        as: 'Departments'
      })
      Images.belongsToMany(models.Tours, {
        through: 'EntityImages',
        foreignKey: 'imageId',
        as: 'DepartmentsRooms'
      })
      Images.belongsToMany(models.DepartmentRooms, {
        through: 'EntityImages',
        foreignKey: 'imageId',
        as: 'Tours'
      })
    }
  }

  Images.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      productId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Images',
      tableName: 'Images',
      timestamps: true,
      scopes: {
        public_view: {
          attributes: ['id', 'imageUrl', 'productId'],
        },
      },
    }
  )

  return Images
}
