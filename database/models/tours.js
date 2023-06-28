'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {
    
    static associate(models) {
      Tours.hasMany(models.Tours_Info, { foreignKey: 'tourId', as: 'Tours_Info' });
      Tours.hasMany(models.Tours_Details, { foreignKey: 'tourId', as: 'Tours_Details' });
      Tours.hasMany(models.Coupons, { foreignKey: 'tourId', as: 'Coupons' });
      Tours.hasMany(models.Reservation_Tours, { foreignKey: 'tourId', as: 'Reservation_Tours' });
      Tours.hasMany(models.Ratings, { foreignKey: 'tourId', as: 'Ratings' });
      Tours.hasMany(models.User_Products, { as: 'User_Products', foreignKey: 'tourId' })
      Tours.hasMany(models.Tour_Images, { as: 'Tour_Images', foreignKey: 'tourId' })
    }
  }
  Tours.init({
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    tourName: DataTypes.STRING, 
    tourDescription: DataTypes.TEXT,
    extras: DataTypes.STRING,
    location: DataTypes.STRING,
    duration: DataTypes.STRING,
    difficulty: DataTypes.STRING,
    languages: DataTypes.ARRAY(DataTypes.STRING),
    numberOfPeople: DataTypes.STRING,
    ages: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours',
    underscored: true, 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['tourName', 'tourDescription', 'extras', 'location', 'duration', 'difficulty', 'languages', 'numberOfPeople', 'ages']
      }
    },
  });
  return Tours;
};

