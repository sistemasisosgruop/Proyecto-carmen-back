'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Departments',
        {
          id: {
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            type: Sequelize.UUID,
          },
          departmentType: {
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
          numRooms: {
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
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
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
      await queryInterface.dropTable('Departments', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
