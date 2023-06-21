const models = require('../database/models')
const UsersService = require('../services/users.services')

const userService = new UsersService()

class RoleAuthorization {
  constructor() {}

  async isAdmin(req, res, next) {
    const userId = req.user.id

    try {
      const user = await userService.getUserOr404(userId)
      const role = await models.Roles.findOne({
        where: {
          id: user.dataValues.role_id,
        },
      })
      if (role.name !== 'admin') {
        return res.status(401).json({ message: 'You are not admin' })
      }
      next()
    } catch (error) {
      return res.status(404).json({ message: error.message })
    }
  }
}

module.exports = RoleAuthorization
