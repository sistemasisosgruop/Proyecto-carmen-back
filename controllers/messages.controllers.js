const MessagesService = require('../services/messages.services')
const UsersService = require('../services/users.services')

const messagesService = new MessagesService()
const usersService = new UsersService()

const postMessage = async (req, res) => {
  try {
    const senderId = req.user.id
    const recipientId = req.params
    const { subject, content } = req.body

    // Verify if the sender and the recipient exist.
    const [senderExists, recipientExists] = await Promise.all([
      usersService.getUser(senderId),
      usersService.getUser(recipientId.id),
    ])

    if (!senderExists || !recipientExists) {
      return res.status(404).json({ message: 'Sender or recipient not found' })
    }

    // Send the message using the service.
    const messageContent = await messagesService.sendMessage(
      senderId,
      recipientId,
      subject,
      content
    )

    return res
      .status(201)
      .json({ message: 'Message sent successfully', messageContent })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  postMessage,
}
