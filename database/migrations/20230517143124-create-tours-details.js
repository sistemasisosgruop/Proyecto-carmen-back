'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tours_Details',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.BIGINT,
          },
          tourId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Tours',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          whatIsIncluded: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          whatIsNotIncluded: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          itinerary: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          departureDetails: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          returnDetails: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          accessibility: {
            allowNull: false,
            type: Sequelize.STRING,
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
      await queryInterface.dropTable('Tours_Details', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
