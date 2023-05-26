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
          tour_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Tours',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          what_is_included: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          what_is_not_included: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          itinerary: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          departure_details: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          return_details: {
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
      await queryInterface.dropTable('Tours_Details', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
