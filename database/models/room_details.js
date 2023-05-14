'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room_Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room_Details.hasMany(models.Rooms, { foreignKey: 'num_rooms' });
    }
  }
  Room_Details.init({
    id: { 
      type: DataTypes.BIGINT, 
      primaryKey: true
    },
    type_room: DataTypes.STRING,
    num_bed: DataTypes.INTEGER,
    type_bed: DataTypes.STRING,
    type_bed_2: DataTypes.STRING,
    photos: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, {
    sequelize,
    modelName: 'Room_Details',
    tableName: 'Room_Details',
    underscored: true
  });

  return Room_Details;
};
