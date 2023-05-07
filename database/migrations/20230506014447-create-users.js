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
        genre: {
          allowNull: false, 
          type: Sequelize.STRING
        },
        document_type: {
          allowNull: false,
          type: Sequelize.STRING
        },
        number_id: {
          allowNull: false, 
          type: Sequelize.INTEGER, 
          unique: true
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
        birthday: {
          allowNull: false, 
          type: Sequelize.DATE, 
          validate: {
            isDate: true
          }
        },
        student: {
          allowNull: false, 
          type: Sequelize.BOOLEAN, 
          default: false
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Countries',
            key: 'id'
          }
        },
        role_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Roles',
            key: 'id'
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
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