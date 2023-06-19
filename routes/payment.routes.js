const express = require('express')
const PaymentController = require('../controllers/payment.controllers')

const paymentController = new PaymentController()
const router = express.Router()

router.post('/create-order', paymentController.createOrder)

// router.post('/success', paymentController)

// router.post('/failure', paymentController)

// router.post('/pending', paymentController)

router.post('/webhook', paymentController.receiveWebhook)

module.exports = router
