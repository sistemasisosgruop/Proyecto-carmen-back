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
          whatToDo: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          goodChoiseFor: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          cancellationPolicy: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          pricePerPerson: {
            allowNull: false,
            type: Sequelize.FLOAT,
          },
          availableDates: {
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
