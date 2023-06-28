'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tours_Info extends Model {
    static associate(models) {
      Tours_Info.belongsTo(models.Tours, { foreignKey: 'tourId', as: 'Tours' })
    }
  }
  Tours_Info.init({
    tourId: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    whatToDo: DataTypes.TEXT,
    goodChoiseFor: DataTypes.TEXT,
    cancellationPolicy: DataTypes.TEXT,
    pricePerPerson: DataTypes.FLOAT,
    availableDates: DataTypes.ARRAY(DataTypes.STRING),
    schedule: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tours_Info',
    tableName: 'Tours_Info',  
    underscored: true, 
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['whatToDo', 'goodChoiseFor', 'cancellationPolicy', 'pricePerPerson', 'availableDates', 'schedule']
      }
    },
  });
  return Tours_Info;
};