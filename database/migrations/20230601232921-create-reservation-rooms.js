'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Reservation_Rooms',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          room_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          type_room: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          check_in: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          check_out: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          address: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          purchase_date: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          purchase_time: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          number_of_people: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          total_price: {
            allowNull: false,
            type: Sequelize.FLOAT,
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
      await queryInterface.dropTable('Reservation_Rooms', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
