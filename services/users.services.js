const { Op } = require('sequelize')
const { v4: uuid4 } = require('uuid')
const { CustomError } = require('../utils/custom-error')
const { hash } = require('../utils/crypto')
const models = require('../database/models')


class UsersService {

  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async createUser(userData) {
    const transaction = await models.Users.sequelize.transaction()
    try {
      let newUser = await models.Users.create(
        {
          id: uuid4(),
          first_name: userData.first_name,
          last_name: userData.last_name,
          genre: userData.genre,
          document_type: userData.document_type,
          number_id: userData.number_id,
          email: userData.email,
          password: hash(userData.password),
          birthday: userData.birthday,
          student: userData.student,
          country_id: userData.country_id,
          role_id: userData.role_id
        },
        { transaction }
      )
      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  async updateUser(id, {first_name, last_name, genre, document_type, number_id, birthday, student}) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      console.log('user: ', user)
      console.log('Name: ', first_name, last_name)
      console.log('Genre: ', genre)
      
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      
      let updatedUser = await user.update(
        {
          first_name,
          last_name,
          genre,
          document_type,
          number_id,
          birthday,
          student
        },
        { transaction }
      )

      await transaction.commit()

      return updatedUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      await user.destroy({ transaction })

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getUserByEmail(email) {
    const user = await models.Users.findOne({
      where: {
        email: email
      }
    })
    return user
  }
}

module.exports = UsersService
