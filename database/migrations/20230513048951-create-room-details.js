'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Room_Details',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            defaultValues: Sequelize.BIGINT,
            type: Sequelize.BIGINT,
          },
          roomId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
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
            type: Sequelize.STRING,
          },
          typeBed2: {
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
      await queryInterface.dropTable('Room_Details', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
