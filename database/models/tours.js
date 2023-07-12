'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {
    
    static associate(models) {
      Tours.hasMany(models.Coupons, { foreignKey: 'tourId', as: 'Coupons' });
      Tours.hasMany(models.ReservationTours, { foreignKey: 'tourId', as: 'ReservationTours' });
      Tours.hasMany(models.Ratings, { foreignKey: 'tourId', as: 'Ratings' });
      Tours.hasMany(models.UserProducts, { as: 'UserProducts', foreignKey: 'tourId' })
      Tours.belongsToMany(models.Images, { through: 'EntityImages', foreignKey: 'tourId', as: 'Images' })
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
    ages: DataTypes.STRING, 
    tourInfo: DataTypes.JSONB, 
    details: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours',
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['tourName', 'tourDescription', 'extras', 'location', 'duration', 'difficulty', 'languages', 'numberOfPeople', 'ages']
      }
    },
  });
  return Tours;
};

