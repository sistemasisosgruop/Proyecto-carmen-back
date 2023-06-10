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
          tour_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Tours',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          type_tour: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          date_selected: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.DATE),
          },
          schedule_selected: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          location: {
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
          total_purchase: {
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
      await queryInterface.dropTable('Reservation_Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
