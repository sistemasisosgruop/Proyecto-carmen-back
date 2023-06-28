'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'Messages',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
          },
          senderId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          recipientId: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          senderFirstName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          senderLastName: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          senderEmail: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
              isEmail: true,
            },
          },
          senderPhoneNumber: {
            allowNull: false,
            type: Sequelize.BIGINT,
          },
          senderCountryCode: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          senderDocumentType: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          senderDocumentNumber: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
          subject: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          content: {
            allowNull: false,
            type: Sequelize.TEXT,
          },
          attachment: {
            type: Sequelize.STRING,
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
      await queryInterface.dropTable('Messages', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
