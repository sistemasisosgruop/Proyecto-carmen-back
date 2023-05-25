'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      image_url: {
        type: Sequelize.STRING
      },
      record_id: {
        type: Sequelize.INTEGER,
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
  await queryInterface.dropTable('Images', { transaction })
  await transaction.commit()
} catch (error) {
  await transaction.rollback()
  throw error
}
},
}