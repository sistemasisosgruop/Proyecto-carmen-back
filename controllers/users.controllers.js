const UsersService = require('../services/users.services')
const { getPagination, getPagingData } = require('../utils/pagination')

const usersService = new UsersService()

class UsersController {
  async getUsers(req, res, next) {
    try {
      let query = req.query
      let { page, size } = query

      const { limit, offset } = getPagination(page, size, '10')
      query.limit = limit
      query.offset = offset

      let users = await usersService.findAndCount(query)
      const results = getPagingData(users, page, limit)
      return res.json(results)
    } catch (error) {
      next(error)
    }
  }

  async addUser(req, res) {
    try {
      let {
        firstName,
        lastName,
        email,
        password,
        genre,
        phoneNumber,
        countryCode,
        documentType,
        documentNumber,
        birthday,
        student,
        roleId,
      } = req.body

      let user = await usersService.createUser({
        firstName,
        lastName,
        email,
        password,
        genre,
        phoneNumber,
        countryCode,
        documentType,
        documentNumber,
        birthday,
        student,
        roleId,
      })
      return res.status(201).json(user)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          firstName: 'String',
          lastName: 'String',
          email: 'example@example.com',
          password: 'String',
          genre: 'String',
          phoneNumber: 'Integer',
          countryCode: 'String',
          documentType: 'String',
          documentNumber: 'Number',
          birthday: 'Date',
          student: 'Boolean',
          roleId: 'String',
        },
      })
    }
  }

  async getUser(req, res) {
    try {
      let { id } = req.params
      let users = await usersService.getUserOr404(id)
      return res.json(users)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid ID' })
    }
  }

  async updateUser(req, res) {
    try {
      let { id } = req.params
      let {
        firstName,
        lastName,
        genre,
        phoneNumber,
        documentType,
        documentNumber,
        birthday,
        student,
      } = req.body

      let user = await usersService.updateUser(id, {
        firstName,
        lastName,
        genre,
        phoneNumber,
        documentType,
        documentNumber,
        birthday,
        student,
      })
      return res.json(user)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid ID' })
    }
  }

  async deleteUser(req, res, next) {
    try {
      let { id } = req.params
      let user = await usersService.removeUser(id)
      return res.json({ user, message: 'removed' })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UsersController
