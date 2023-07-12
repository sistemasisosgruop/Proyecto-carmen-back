'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'EntityImages',
        {
          id: {
            primaryKey: true,
            type: Sequelize.BIGINT,
            defaulValue: Sequelize.BIGINT,
            autoIncrement: true,
          },
          imageId: {
            type: Sequelize.UUID,
          },
          departmentId: {
            type: Sequelize.UUID,
          },
          roomId: {
            type: Sequelize.UUID,
          },
          tourId: {
            type: Sequelize.UUID,
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
      await queryInterface.dropTable('EntityImages', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
