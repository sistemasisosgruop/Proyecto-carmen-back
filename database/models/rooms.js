'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rooms extends Model {
    static associate(models) {

      Rooms.hasMany(models.Room_Details, { foreignKey: 'room_id', as: 'Room_Details' });
      Rooms.hasMany(models.Room_Details_2, { foreignKey: 'room_id', as: 'Room_Details_2' });
      Rooms.hasMany(models.Reservations, { foreignKey: 'room_id', as: 'Reservations' });
    }
  }
  Rooms.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    room_type: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    price: DataTypes.FLOAT,
    check_in: DataTypes.STRING,
    check_out: DataTypes.STRING,
    num_bathrooms: DataTypes.INTEGER,
    num_beds: DataTypes.INTEGER,
    extras: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    sequelize,
    modelName: 'Rooms',
    tableName: 'Rooms',
    underscored: true
  });

  return Rooms;
};





















/*
'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tours',
        },
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}


'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tour_Info',
        ,
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Tour_Info', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}



'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tour_Details',
        ,
        { transaction }
      )
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Info_Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}



*/



//! MODELS

/*

'use strict'
const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Tours extends Model {

    static associate(models) {

    }
  }
  Tours.init({

  }, {
    sequelize,
    modelName: 'Tours',
    tableName: 'Tours',
    underscored: true
  });
  return Tours;
};

'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tour_Details extends Model {

    static associate(models) {
    }
  }
  Tour_Details.init(
    {
    },
    {
      sequelize,
      modelName: 'Tour_Details',
      tableName: 'Tour_Details',
      underscored: true,
    }
  )
  return Tour_Details
}


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour_Info extends Model {

    static associate(models) {
    }
  }
  Tour_Info.init({

  }, {
    sequelize,
    modelName: 'Tour_Info', 
    tableName: 'Tour_Info', 
    underscored: true
  });
  return Tour_Info;
};

*/