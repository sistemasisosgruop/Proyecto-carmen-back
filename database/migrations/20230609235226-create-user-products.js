'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'UserProducts',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          cartId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'ShopingCart',
              key: 'id',
            },
          },
          departmentId: {
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
      await queryInterface.dropTable('UserProducts', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
