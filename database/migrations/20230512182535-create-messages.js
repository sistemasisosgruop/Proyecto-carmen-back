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
          sender_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          recipient_id: {
            allowNull: false,
            type: Sequelize.UUID,
            references: {
              model: 'Users',
              key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          sender_first_name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          sender_last_name: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          sender_email: {
            allowNull: false,
            type: Sequelize.STRING,
            validate: {
              isEmail: true,
            },
          },
          sender_phone_number: {
            allowNull: false,
            type: Sequelize.BIGINT,
          },
          sender_country_code: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          sender_document_type: {
            allowNull: false,
            type: Sequelize.STRING,
          },
          sender_document_number: {
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
