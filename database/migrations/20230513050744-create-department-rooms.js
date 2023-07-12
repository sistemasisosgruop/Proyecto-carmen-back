'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'DepartmentRooms',
        {
          id: {
            primaryKey: true,
            defaultValues: Sequelize.UUID,
            type: Sequelize.UUID,
          },
          departmentId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Departments',
              key: 'id',
            },
          },
          typeRoom: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          numBed: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          typeBed: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          numBaths: {
            allowNull: false,
            type: Sequelize.INTEGER,
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
      await queryInterface.dropTable('DepartmentRooms', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
