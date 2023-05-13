const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

// class MessagesService {
//   constructor() {}

//   async sendMessage(senderId, recipientId, subject, content) {
//     const transaction = await models.Users.sequelize.transaction()
//     try {
//       const sender = await models.Users.findByPk(senderId)
//       const recipient = await models.Users.findByPk(recipientId.id)
//       console.log('sender: ', sender.dataValues.role_id)
//       console.log('recipient: ', recipient)
      
//       if (!this.canSendMessage(sender, recipient)) {
//         throw new Error('Unauthorized: Messages cannot be sent between these users.')
//       }

//       const message = await models.Messages.create(
//         {
//           id: uuid4(),
//           sender_id: senderId,
//           recipient_id: recipientId.id,
//           sender_first_name: sender.first_name,
//           sender_last_name: sender.last_name,
//           sender_email: sender.email,
//           sender_phone_number: sender.phone_number,
//           sender_country_code: sender.country_code,
//           sender_document_type: sender.document_type,
//           sender_document_number: sender.document_number,
//           subject: subject,
//           content: content,
//         },
//         { transaction }
//       )

//       await transaction.commit()
//       return message
//     } catch (error) {
//       await transaction.rollback()
//       throw error
//     }
//   }

//   canSendMessage(sender, recipient) {
//     // Verificar si el remitente y el receptor tienen los permisos adecuados
//     if (
//       this.hasPermission(sender.dataValues.role_id, 'sendMessages') &&
//       this.hasPermission(recipient.dataValues.role_id, 'receiveMessages')
//     ) {
//       return true
//     }
//     return false
//   }

//   hasPermission(role, permission) {
//     // Verificar si un rol tiene un permiso específico
//     if (!role || !role.permissions || !Array.isArray(role.permissions)) {
//       return false
//     }
//     return role.permissions.includes(permission)
//   }
// }

// module.exports = MessagesService





class MessagesService {
  constructor() {}

  async sendMessage(senderId, recipientId, subject, content) {
    console.log('senderId: ', senderId)
    console.log('recipientId: ', recipientId.id)
    console.log('subject: ', subject)
    console.log('content: ', content)

    const transaction = await models.Users.sequelize.transaction()

    try {
      //Extraemos informacion del usuario que envía el mensaje
      const sender = await models.Users.findByPk(senderId)
      // Verificar si el remitente es un administrador
      // const recipient = await models.Users.findByPk(recipientId.id)
      // if (!recipient || recipientId.role_id !== 'admin') {
      //   throw new Error('Unauthorized: Messages can only be sent to administrators.')
      // }

      const message = await models.Messages.create({
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
        content: content
      }, { transaction })

      await transaction.commit()
      return message
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = MessagesService
