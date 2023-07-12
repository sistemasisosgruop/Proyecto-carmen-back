const { comparePassword, hash } = require('../utils/crypto')
const UsersServices = require('../services/users.services')
const models = require('../database/models')
const { v4: uuid4 } = require('uuid')

const UsersService = new UsersServices()

const verifyUser = async (email, password) => {
  try {
    const user = await UsersService.getUserByEmail(email)
    const compare = comparePassword(password, user.dataValues.password)
    if (compare) {
      return user
    } else {
      return null
    }
  } catch (error) {
    return null
  }
}

const createRecoveryToken = async (email) => {
  try {
    const user = await UsersService.getUserByEmail(email)
    const data = await models.RecoveryPasswords.create({
      id: uuid4(),
      userId: user.id,
      used: false,
    })
    return data
  } catch (error) {
    console.log(error) //  DEBUG -------------------------------------------------
    return null
  }
}

const changePassword = async (tokenId, newPassword) => {
  const changeData = await models.RecoveryPasswords.findOne({
    where: {
      id: tokenId,
      used: false,
    },
  })
  if (changeData) {
    await models.RecoveryPasswords.update(
      { used: true },
      {
        where: {
          id: tokenId,
        },
      }
    )
    const data = await UsersService.updateUser(changeData.dataValues.userId, {
      password: hash(newPassword),
    })
    return data
  } else {
    return false
  }
}

module.exports = {
  verifyUser,
  createRecoveryToken,
  changePassword,
}
