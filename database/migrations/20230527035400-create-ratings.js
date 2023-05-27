'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.UUID
      },
      product_type: {
        type: Sequelize.STRING
      },
      rating: {
        type: Sequelize.FLOAT
      },
      comment: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updated_at: {
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
  await queryInterface.dropTable('Ratings', { transaction })
  await transaction.commit()
} catch (error) {
  await transaction.rollback()
  throw error
}
},
}