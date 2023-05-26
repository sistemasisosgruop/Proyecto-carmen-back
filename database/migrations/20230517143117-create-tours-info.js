'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tours_Info',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.BIGINT, 
            autoIncrement: true,
            type: Sequelize.BIGINT,
          },
          tour_id: {
            type: Sequelize.UUID,
            references: {
              model: 'Tours',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          image_url: {
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          what_to_do: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          good_choise_for: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          cancellation_policy: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          price_per_person: {
            allowNull: false,
            type: Sequelize.FLOAT,
          },
          available_dates: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          schedule: {
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
      await queryInterface.dropTable('Tours_Info', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
