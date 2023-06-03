'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Room_Details_2',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            defaultValues: Sequelize.BIGINT,
            type: Sequelize.BIGINT,
          },
          room_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Rooms',
              key: 'id'
            }
          },
          images_url: {
            allowNull: false, 
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          amenities: {
            allowNull: false, 
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          not_included: {
            allowNull: false, 
            type: Sequelize.ARRAY(Sequelize.STRING),
          },
          services: {
            allowNull: false, 
            type: Sequelize.ARRAY(Sequelize.STRING),
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
      await queryInterface.dropTable('Room_Details_2', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
