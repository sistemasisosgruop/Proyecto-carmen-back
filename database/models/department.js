const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    static associate(models) {
      Departments.hasMany(models.DepartmentRooms, { foreignKey: 'departmentId', as: 'DepartmentRooms' });
      Departments.hasMany(models.Coupons, { foreignKey: 'departmentId', as: 'Coupons' });
      Departments.hasMany(models.ReservationDepartments, { foreignKey: 'departmentId', as: 'reservationDepartments' });
      Departments.hasMany(models.Ratings, { foreignKey: 'departmentId', as: 'Ratings' });
      Departments.hasMany(models.UserProducts, { as: 'UserProducts', foreignKey: 'departmentId' });
      Departments.belongsToMany(models.Images, { through: 'EntityImages', foreignKey: 'departmentId', as: 'Images'});
    }
  }

  Departments.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      departmentType: DataTypes.STRING,
      description: DataTypes.TEXT,
      address: DataTypes.STRING,
      price: DataTypes.FLOAT,
      checkIn: DataTypes.STRING,
      checkOut: DataTypes.STRING,
      numBathrooms: DataTypes.INTEGER,
      numBeds: DataTypes.INTEGER,
      numRooms: DataTypes.INTEGER,
      extras: DataTypes.ARRAY(DataTypes.STRING),
      details: DataTypes.JSONB
    },
    {
      sequelize,
      modelName: 'Departments',
      tableName: 'Departments',
      timestamps: true,
      scopes: {
        public_view: {
          attributes: [
            'departmentType',
            'description',
            'address',
            'price',
            'checkId',
            'checkOut',
            'numBathrooms',
            'numBeds',
            'extras', 
            'details',
          ],
        },
      },
    }
  );

  return Departments;
};
