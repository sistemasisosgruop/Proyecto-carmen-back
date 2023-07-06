'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Users',
        {
          id: {
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          firstName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          lastName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING,
            unique: true,
            validate: {
              isEmail: true,
            },
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          genre: {
            type: Sequelize.STRING,
          },
          phoneNumber: {
            allowNull: false,
            type: Sequelize.BIGINT,
          },
          countryCode: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Countries',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          documentType: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          documentNumber: {
            allowNull: false,
            type: Sequelize.INTEGER,
            unique: true,
          },
          birthday: {
            allowNull: false,
            type: Sequelize.DATE,
            validate: {
              isDate: true,
            },
          },
          student: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false,
          },
          roleId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Roles',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
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
      await queryInterface.dropTable('Users', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
