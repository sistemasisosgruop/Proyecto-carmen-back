'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tours',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            type: Sequelize.UUID,
          },
          tourName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          tourDescription: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          extras: {
            type: Sequelize.STRING,
          },
          location: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          duration: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          difficulty: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          languages: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          numberOfPeople: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          ages: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          tourInfo: {
            allowNull: false,
            type: Sequelize.JSONB,
          },
          details: {
            allowNull: false,
            type: Sequelize.JSONB,
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
      await queryInterface.dropTable('Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
