const UsersService = require('../services/users.services')
const { getPagination, getPagingData } = require('../utils/pagination')

const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })
  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  try {
    let {
      first_name,
      last_name,
      genre,
      document_type,
      number_id,
      email,
      password,
      birthday,
      student,
      country_id,
      role_id,
    } = request.body

    let user = await usersService.createUser({
      first_name,
      last_name,
      genre,
      document_type,
      number_id,
      email,
      password,
      birthday,
      student,
      country_id,
      role_id,
    })
    return response.status(201).json({ results: user })
  } catch (error) {
    return response.status(401).json({
      message: error.message,
      fields: {
        'first_name': 'String',
        'last_name': 'String',
        'genre': 'String',
        'document_type': 'String',
        'number_id': 'Number',
        'email': 'example@example.com',
        'password': 'String',
        'birthday': 'Date',
        'student': 'Boolean',
        'country_id': 'Number',
        'role_id': 'String',
      },
    })
  }
}

const getUser = async (request, response) => {
  try {
    let { id } = request.params
    let users = await usersService.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    return response.status(401).json({message: 'Invalid ID'})
  }
}

const updateUser = async (request, response) => {
  try {
    let { id } = request.params
    let { first_name, last_name, genre, document_type, number_id, birthday, student } = request.body
    let user = await usersService.updateUser(id, {first_name, last_name, genre, document_type, number_id, birthday, student})
    return response.json({ results: user })
  } catch (error) {
    return response.status(401).json({message: 'Invalid ID'})
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
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
