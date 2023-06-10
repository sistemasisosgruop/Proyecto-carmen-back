const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

class MessagesService {
  constructor() {}

  async sendMessage(senderId, recipientId, subject, content) {
    const transaction = await models.Messages.sequelize.transaction()

    try {
      const sender = await models.Users.findByPk(senderId)
      const recipient = await models.Users.findByPk(recipientId.id)
      if (
        (!sender || sender.role_id !== 1) &&
        (!recipient || recipient.role_id !== 1)
      ) {
        throw new Error(
          'Unauthorized: Messages can only be sent to administrators.'
        )
      }

      const message = await models.Messages.create(
        {
          id: uuid4(),
          sender_id: senderId,
          recipient_id: recipientId.id,
          sender_first_name: sender.first_name,
          sender_last_name: sender.last_name,
          sender_email: sender.email,
          sender_phone_number: sender.phone_number,
          sender_country_code: sender.country_code,
          sender_document_type: sender.document_type,
          sender_document_number: sender.document_number,
          subject: subject,
          content: content,
        },
        { transaction }
      )

      await transaction.commit()
      return message
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
module.exports = MessagesService
