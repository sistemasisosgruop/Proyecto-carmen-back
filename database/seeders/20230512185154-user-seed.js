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
            firstName: 'Nicolas',
            lastName: 'Pantoja',
            email: 'nicolas@mail.com',
            password: hash('root'),
            genre: 'Male',
            phoneNumber: '3104003000',
            countryCode: '1',
            documentType: 'Passport',
            documentNumber: 123456789,
            birthday: new Date(),
            student: 'True',
            roleId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuid4(),
            firstName: 'Josh',
            lastName: 'Homme',
            email: 'josh@mail.com',
            password: hash('root'),
            genre: 'Male',
            phoneNumber: '26565412',
            countryCode: '2',
            documentType: 'ID',
            documentNumber: 222222,
            birthday: new Date(),
            student: 'True',
            roleId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuid4(),
            firstName: 'John',
            lastName: 'Douglas',
            email: 'john@mail.com',
            password: hash('root'),
            genre: 'Male',
            phoneNumber: '95654211',
            countryCode: '1',
            documentType: 'ID',
            documentNumber: 3356481,
            birthday: new Date(),
            student: 'False',
            roleId: 2,
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
      await queryInterface.bulkDelete('Users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
