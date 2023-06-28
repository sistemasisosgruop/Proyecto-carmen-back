'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      Messages.belongsTo(models.Users, { foreignKey: 'senderId', as: 'sender' })
      Messages.belongsTo(models.Users, { foreignKey: 'recipientId', as: 'recipient' })
    }
  }
  Messages.init({
    id: {
      type: DataTypes.UUID, 
      primaryKey: true
    },
    senderId: DataTypes.UUID,
    recipientId: DataTypes.UUID,
    senderFirstName: DataTypes.STRING,
    senderLastName: DataTypes.STRING,
    senderEmail: DataTypes.STRING,
    senderPhoneNumber: DataTypes.BIGINT,
    senderCountryCode: DataTypes.STRING,
    senderDocumentType: DataTypes.STRING,
    senderDocumentNumber: DataTypes.INTEGER,
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
        attributes: ['senderId', 'senderFirstName', 'senderLastName', 'senderEmail', 'senderPhoneNumber', 'senderCountryCode', 'senderDocumentType', 'senderDocumentNumber', 'subject', 'content' ]
      }
    },
  });
  return Messages;
};