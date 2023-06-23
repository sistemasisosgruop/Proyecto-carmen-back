'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'User_Products',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          cart_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Shoping_Cart',
              key: 'id',
            },
          },
          room_id: {
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
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
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false,
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
      await queryInterface.dropTable('User_Products', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
