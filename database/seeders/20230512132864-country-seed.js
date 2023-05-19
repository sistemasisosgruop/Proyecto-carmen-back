'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Countries', [
        {
          id: 1,
          code: '+57',
          country: 'Colombia',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          code: '+21',
          country: 'Sudafrica',
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
      await queryInterface.bulkDelete('Countries', {
        name: {
          [Op.or]: ['Perú']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}