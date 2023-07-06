'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert(
        'Countries',
        [
          {
            id: 1,
            code: '+57',
            country: 'Colombia',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            code: '+21',
            country: 'Sudafrica',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete(
        'Countries',
        {
          country: {
            [Op.or]: ['Colombia'],
          },
        },
        {
          country: {
            [Op.or]: ['Sudafrica'],
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
}
