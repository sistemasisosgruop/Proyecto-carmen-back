'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Tours',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
            type: Sequelize.UUID,
          },
          tour_name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          tour_description: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          extras: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          location: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          duration: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          difficulty: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          languages: {
            allowNull: false,
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          number_of_people: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          ages: {
            allowNull: false,
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
      await queryInterface.dropTable('Tours', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
