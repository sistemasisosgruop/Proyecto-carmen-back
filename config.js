require('dotenv').config()

module.exports = {
  api: {
    //! port: process.env.PORT ? process.env.PORT : 3000,
    port: process.env.PORT || 8000,
    host: process.env.HOST || 'http://localhost:8000/',
    emailPass: process.env.MAIL_PASS,
    user: process.env.MAIL_USER,
    jwtSecret: process.env.JWT_SECRET,
  }
}

