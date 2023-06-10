const bcrypt = require('bcryptjs')
require('dotenv').config()

const saltRouds = parseInt(process.env.BCRYPT_SALT_ROUNDS)

const hash = (myPlaintextPassword) =>
  bcrypt.hashSync(myPlaintextPassword, saltRouds)
const comparePassword = (myPlaintextPassword, password) =>
  bcrypt.compareSync(myPlaintextPassword, password)

module.exports = {
  hash,
  comparePassword,
}
