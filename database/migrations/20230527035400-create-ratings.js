'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Ratings',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            type: Sequelize.UUID,
          },
          departmenId: {
            type: Sequelize.UUID,
            references: {
              model: 'Departments',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          tourId: {
            type: Sequelize.UUID,
            references: {
              model: 'Tours',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          rate: {
            allowNull: false,
            type: Sequelize.FLOAT,
          },
          comment: {
            allowNull: true,
            type: Sequelize.TEXT,
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
      await queryInterface.dropTable('Ratings', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
