'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Roles', [
        {
          id: 1,
          name: 'admin',
          permissions: ['sendMessages', 'receiveMessages'],
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'public',
          permissions: ['sendMessages'],
          created_at: new Date(),
          updated_at: new Date()
        }
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('roles', {
        name: {
          [Op.or]: ['admin', 'public']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}