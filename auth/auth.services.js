const { comparePassword, hash } = require('../utils/crypto')
const UsersServices = require('../services/users.services')
const models = require('../database/models')
const { v4: uuid4} = require('uuid')
const { updateUser } = require('../controllers/users.controllers')

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

const createRecoveryToken = async (email) => {

  try {
    const user = await UsersService.getUserByEmail(email)
    const data = await models.Recovery_Passwords.create({
      id: uuid4(),
      user_id: user.id,
      used: false
    })
    return data
  } catch (error) {
    console.log(error)  //  DEBUG -------------------------------------------------
    return null
  }
}

const changePassword = async (tokenId, newPassword) => {

  const changeData = await models.Recovery_Passwords.findOne({
    where: {
      id: tokenId,
      used: false
    }
  })
  if(changeData) {
    await models.Recovery_Passwords.update({used: true}, {
      where: {
        id: tokenId
      }
    })
    const data = await UsersService.updateUser(changeData.dataValues.user_id, {
      password: hash(newPassword)
    })
    return data
  } else {
    return false
  }
}

module.exports = {
  verifyUser,
  createRecoveryToken, 
  changePassword
}
