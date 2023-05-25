'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Room-Images', {
        id: {
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          type: Sequelize.UUID
        },
        room_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'Rooms',
            key: 'id'
          }
        },
        image_id: {
          type: Sequelize.UUID,
          references: {
            model: 'Images',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
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
  await queryInterface.dropTable('Room-Images', { transaction })
  await transaction.commit()
} catch (error) {
  await transaction.rollback()
  throw error
}
},
}