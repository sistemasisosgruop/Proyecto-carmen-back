const express = require('express')
const routes = express.Router()
const { postLogin } = require('./auth.controllers')


routes.post('/login', postLogin)

module.exports = routes