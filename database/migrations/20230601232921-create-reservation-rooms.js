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
          userId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          roomId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          typeRoom: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          checkIn: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          checkOut: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          address: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          purchaseDate: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          purchaseTime: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          numberOfPeople: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          totalPrice: {
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
