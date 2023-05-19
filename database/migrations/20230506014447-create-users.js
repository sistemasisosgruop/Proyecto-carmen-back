'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        first_name: {
          allowNull: false, 
          type: Sequelize.STRING
        },
        last_name: {
          allowNull: false, 
          type: Sequelize.STRING
        },
        email: {
          allowNull: false, 
          type: Sequelize.STRING, 
          unique: true, 
          validate: {
            isEmail: true
          }
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING
        },
        genre: {
          type: Sequelize.STRING
        },
        phone_number: {
          allowNull: false,
          type: Sequelize.BIGINT
        },
        country_code: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Countries',
            key: 'id'
          }
        },
        document_type: {
          type: Sequelize.STRING
        },
        document_number: {
          type: Sequelize.INTEGER, 
          unique: true
        },
        birthday: { 
          type: Sequelize.DATE, 
          validate: {
            isDate: true
          }
        },
        student: {
          allowNull: false, 
          type: Sequelize.BOOLEAN, 
          defaultValue: false
        },
        role_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Roles',
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
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Users',{ transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}