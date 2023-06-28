'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Rooms',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            type: Sequelize.UUID,
          },
          roomType: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          description: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          address: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          price: {
            allowNull: false,
            type: Sequelize.FLOAT,
          },
          checkIn: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          checkOut: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          numBathrooms: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          numBeds: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          extras: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'created_at',
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'updated_at',
          },
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
      await queryInterface.dropTable('Rooms', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
