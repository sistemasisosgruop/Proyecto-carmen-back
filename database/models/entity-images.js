const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class EntityImages extends Model {
    static associate(models) {
      EntityImages.belongsTo(models.Images, { foreignKey: 'imageId', as: 'Images' });
      EntityImages.belongsTo(models.Departments, { foreignKey: 'departmentId', as: 'Departments' });
      EntityImages.belongsTo(models.DepartmentRooms, { foreignKey: 'roomId', as: 'Rooms' });
    }
  }

  EntityImages.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.BIGINT,
        defaulValue: DataTypes.BIGINT,
        autoIncrement: true,
      },
      imageId: {
        type: DataTypes.UUID,
        references: {
          model: 'Images',
          key: 'id',
        },
      },
      departmentId: {
        type: DataTypes.UUID,
        references: {
          model: 'Departments',
          key: 'id',
        },
      },
      roomId: {
        type: DataTypes.UUID,
        references: {
          model: 'DepartmentRooms',
          key: 'id',
        },
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'EntityImages',
      tableName: 'EntityImages',
      timestamps: true,
    }
  );

  return EntityImages;
};
