const mercadoPago = require('mercadopago')
require('dotenv').config()

class PaymentController {
  constructor() {}

  async createOrder(req, res) {
    mercadoPago.configure({
      access_token: process.env.ACCESS_TOKEN,
    })
    const result = await mercadoPago.preferences.create({
      items: [
        {
          title: 'ROOM',
          unit_price: 10000,
          currency_id: 'COP',
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'http://localhost:3000/api/v1/cart/success',
      },
      notification_url: 'https://7254-8-242-152-7.ngrok.io/api/v1/cart/webhook',
    })
    console.log(result)
    res.send('DONE')
  }

  async receiveWebhook(req, res) {
    const payment = req.query
    try {
      if (payment.type === 'payment') {
        const data = await mercadoPago.payment.findById(payment['data.id'])
        console.log(data)
      }
      console.log(req.query)

      //aqui debo guardar en base de datos
      res.send('webhook')
    } catch (error) {
      console.log(error)
      res.status(401).json({ message: error.message })
    }
  }
}

module.exports = PaymentController
