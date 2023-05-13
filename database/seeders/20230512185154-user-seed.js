//Seeder creado

//noten que es igual a una migración!

'use strict'
const { Op } = require('sequelize')
const { v4: uuid4 } = require('uuid')
const { hash } = require('../../utils/crypto')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert(
        'Users',
        [
          {
            id: uuid4(),
            first_name: 'Nicolas',
            last_name: 'Pantoja',
            email: 'algofobico@gmail.com',
            password: hash('root'),
            genre: 'Male', 
            phone_number: '3104252781',
            country_code: '1',
            document_type: 'Passport',
            document_number: 123456789,
            birthday: new Date(),
            student: 'True',
            role_id: 2,
            created_at: new Date(),
            updated_at: new Date()
          },
          {
            id: uuid4(),
            first_name: 'Samuel',
            last_name: 'Pantoja',
            email: 'samuel@mail.com',
            password: hash('root'),
            genre: 'Male',
            phone_number: '3104252781',
            country_code: '2',
            document_type: 'ID',
            document_number: 222222,
            birthday: new Date(),
            student: 'True',
            role_id: 1,
            created_at: new Date(),
            updated_at: new Date()
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
        'roles',
        {
          name: {
            [Op.or]: ['admin', 'public'],
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
