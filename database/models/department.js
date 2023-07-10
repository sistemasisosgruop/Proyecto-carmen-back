const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Departments extends Model {
    static associate(models) {
      Departments.hasMany(models.Department_Details, { foreignKey: 'departmentId', as: 'Department_Details' });
      Departments.hasMany(models.Department_Rooms, { foreignKey: 'departmentId', as: 'Department_Rooms' });
      Departments.hasMany(models.Coupons, { foreignKey: 'departmentId', as: 'Coupons' });
      Departments.hasMany(models.Reservation_Departments, { foreignKey: 'departmentId', as: 'reservationDepartments' });
      Departments.hasMany(models.Ratings, { foreignKey: 'departmentId', as: 'Ratings' });
      Departments.hasMany(models.User_Products, { as: 'User_Products', foreignKey: 'departmentId' });
      Departments.belongsToMany(models.Images, { through: 'EntityImage', foreignKey: 'departmentId' });
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
          ],
        },
      },
    }
  );

  return Departments;
};
