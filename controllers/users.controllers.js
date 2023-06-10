const UsersService = require('../services/users.services')
const { getPagination, getPagingData } = require('../utils/pagination')

const usersService = new UsersService()

const getUsers = async (req, res, next) => {
  try {
    let query = req.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return res.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addUser = async (req, res, next) => {
  try {
    let {
      first_name,
      last_name,
      email,
      password,
      genre,
      phone_number,
      country_code,
      document_type,
      document_number,
      birthday,
      student,
      role_id,
    } = req.body

    let user = await usersService.createUser({
      first_name,
      last_name,
      email,
      password,
      genre,
      phone_number,
      country_code,
      document_type,
      document_number,
      birthday,
      student,
      role_id,
    })
    return res.status(201).json({ results: user })
  } catch (error) {
    return res.status(401).json({
      message: error.message,
      fields: {
        first_name: 'String',
        last_name: 'String',
        email: 'example@example.com',
        password: 'String',
        genre: 'String',
        phone_number: 'Integer',
        country_code: 'String',
        document_type: 'String',
        document_number: 'Number',
        birthday: 'Date',
        student: 'Boolean',
        role_id: 'String',
      },
    })
  }
}

const getUser = async (req, res) => {
  try {
    let { id } = req.params
    let users = await usersService.getUserOr404(id)
    return res.json({ results: users })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid ID' })
  }
}

const updateUser = async (req, res) => {
  try {
    let { id } = req.params
    let {
      first_name,
      last_name,
      genre,
      phone_number,
      document_type,
      document_number,
      password,
      birthday,
      student,
    } = req.body

    let user = await usersService.updateUser(id, {
      first_name,
      last_name,
      genre,
      phone_number,
      document_type,
      document_number,
      password,
      birthday,
      student,
    })
    return res.json({ results: user })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid ID' })
  }
}

const removeUser = async (req, res, next) => {
  try {
    let { id } = req.params
    let user = await usersService.removeUser(id)
    return res.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser,
}
