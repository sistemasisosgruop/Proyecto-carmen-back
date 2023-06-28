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
        (!sender || sender.roleId !== 1) &&
        (!recipient || recipient.roleId !== 1)
      ) {
        throw new Error(
          'Unauthorized: Messages can only be sent to administrators.'
        )
      }

      const message = await models.Messages.create(
        {
          id: uuid4(),
          senderId: senderId,
          recipientId: recipientId.id,
          senderFirstName: sender.firstName,
          senderLastName: sender.lastName,
          senderEmail: sender.email,
          senderPhoneNumber: sender.phoneNumber,
          senderCountryCode: sender.countryCode,
          senderDocumentType: sender.documentType,
          senderDocumentNumber: sender.documentNumber,
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
