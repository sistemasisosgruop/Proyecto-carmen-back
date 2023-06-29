const jwt = require('jsonwebtoken')
const {
  verifyUser,
  createRecoveryToken,
  changePassword,
} = require('./auth.services')
const mailer = require('../utils/mailer')
const config = require('../config')

const postLogin = (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    verifyUser(email, password)
      .then((data) => {
        if (data) {
          const token = jwt.sign(
            {
              id: data.id,
              email: data.email,
              roleId: data.roleId,
            },
            config.api.jwtSecret
          )
          res.status(200).json({ message: 'Correct Credentials', token })
        } else {
          res.status(400).json({ message: 'Invalid Credentials' })
        }
      })
      .catch((err) => res.status(404).json({ message: err.message }))
  } else {
    res.status(400).json({
      message: 'All parametres are required',
      fields: {
        email: 'example@example.com',
        password: 'String',
      },
    })
  }
}

const postRecoveryToken = (req, res) => {
  const { email } = req.body
  if (email) {
    createRecoveryToken(email)
      .then((data) => {
        if (data) {
          mailer.sendMail({
            from: 'nicolaspantojadi@gmail.com',
            to: email,
            subject: 'Recovery Password',
            html: `Through this link you'll be able to recover the access by updating your password: <a href=http://localhost:5173/recuperacion/nueva-contrasena/${data.dataValues.id}'>http://localhost:5173/recuperacion/nueva-contrasena/${data.dataValues.id}</a>`,
            text: `Password recovery URL: http://localhost:5173/recuperacion/nueva-contrasena/${data.dataValues.id}`,
            // html: `Through this link you'll be able to recover the access by updating your password: <a href='${config.api.host}/api/v1/recovery-password/${data.dataValues.id}'>${config.api.host}/api/v1/recovery-password/${data.dataValues.id}</a>`,
            // text: `Password recovery URL: ${config.api.host}/api/v1/recovery-password/${data.dataValues.id}`,
          })
          res.status(200).json({ message: 'Email sended. Check your inbox!' })
        } else {
          res.status(400).json({ message: 'Error, token not created' })
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err })
      })
  } else {
    res.status(400).json({
      message: 'Invalid data',
      fields: {
        email: 'example@example.com',
      },
    })
  }
}

const patchPassword = (req, res) => {
  const id = req.params.id
  const { password } = req.body

  changePassword(id, password)
    .then((data) => {
      if (data) {
        res.status(200).json({ message: 'Password updated successfully' })
      } else {
        res.status(400).json({ message: 'URL Expired' })
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message })
    })
}

module.exports = {
  postLogin,
  postRecoveryToken,
  patchPassword,
}
