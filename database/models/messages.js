'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Messages.belongsTo(models.Users, { foreignKey: 'sender_id', as: 'sender' })
      Messages.belongsTo(models.Users, { foreignKey: 'recipient_id', as: 'recipient' })
    }
  }
  Messages.init({
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    sender_id: DataTypes.UUID,
    recipient_id: DataTypes.UUID,
    sender_first_name: DataTypes.STRING,
    sender_last_name: DataTypes.STRING,
    sender_email: DataTypes.STRING,
    sender_phone_number: DataTypes.BIGINT,
    sender_country_code: DataTypes.STRING,
    sender_document_type: DataTypes.STRING,
    sender_document_number: DataTypes.INTEGER,
    subject: DataTypes.STRING,
    content: DataTypes.TEXT,
    attachment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Messages',
    tableName: 'Messages',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['sender_id', 'sender_first_name', 'sender_last_name', 'sender_email', 'sender_phone_number', 'sender_country_code', 'sender_document_type', 'sender_document_number', 'subject', 'content' ]
      }
    },
  });
  return Messages;
};