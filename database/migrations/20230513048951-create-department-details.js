'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Department_Details',
        {
          id: {
            primaryKey: true,
            autoIncrement: true,
            defaultValues: Sequelize.BIGINT,
            type: Sequelize.BIGINT,
          },
          departmentId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Departments',
              key: 'id',
            },
          },
          amenities: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          notIncluded: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          services: {
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
      await queryInterface.dropTable('Department_Details', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
