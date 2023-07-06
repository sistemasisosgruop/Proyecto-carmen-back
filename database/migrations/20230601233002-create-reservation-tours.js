'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Reservation_Tours',
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
          typeTour: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          dateSelected: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.DATE),
          },
          scheduleSelected: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          location: {
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
          totalPurchase: {
            allowNull: false,
            type: Sequelize.FLOAT,
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
      await queryInterface.dropTable('Reservation_Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
