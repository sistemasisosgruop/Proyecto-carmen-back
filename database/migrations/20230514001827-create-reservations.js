'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Reservations',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
          },
          user_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id'
            }
          },
          room_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
              key: 'id'
            }
          },
          type_room: {
            allowNull:false, 
            type: Sequelize.STRING,
          },
          check_in: {
            allowNull:false, 
            type: Sequelize.DATE,
          },
          check_out: {
            allowNull:false, 
            type: Sequelize.DATE,
          },
          address: {
            allowNull:false, 
            type: Sequelize.STRING,
          },
          status: {
            type: Sequelize.STRING
          },
          payment_status: {
            type: Sequelize.STRING
          },
          purchase_date: {
            allowNull:false, 
            type: Sequelize.DATE,
          },
          purchase_time: {
            allowNull:false, 
            type: Sequelize.DATE,
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
      await queryInterface.dropTable('Reservations', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
