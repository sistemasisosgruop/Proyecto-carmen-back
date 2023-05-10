const { comparePassword } = require('../utils/crypto')
const UsersServices = require('../services/users.services')

const UsersService = new UsersServices()
const verifyUser = async (email, password) => {

  try {
    const user = await UsersService.getUserByEmail(email)
    const compare = comparePassword(password, user.password)
    if (compare) {
      return user
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

module.exports = {
  verifyUser,
}
