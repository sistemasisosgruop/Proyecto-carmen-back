const RolesService = require('../services/roles.services')
const { getPagination, getPagingData } = require('../utils/pagination')

const roleService = new RolesService()

class RolesController {
  constructor() {}

  async getRoles(req, res) {
    try {
      let query = req.query
      let { page, size } = query

      const { limit, offset } = getPagination(page, size, '10')
      query.limit = limit
      query.offset = offset

      const roles = await roleService.findAndCount(query)
      const results = getPagingData(roles, page, limit)
      return res.json(results)
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }

  async getRoleById(req, res) {
    const { roleId } = req.params
    try {
      const role = await roleService.findRoleById(roleId)
      return res.json(role)
    } catch (error) {
      return res.status(401).json({ message: 'Role not found' })
    }
  }

  async postRole(req, res) {
    const { name, permissions } = req.body
    try {
      const role = await roleService.createRole(name, permissions)
      return res.status(201).json(role)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          name: 'String',
          permissions: ['String'],
        },
      })
    }
  }

  async patchRole(req, res) {
    const { roleId } = req.params
    const { name, permissions } = req.body

    try {
      const updatedRole = await roleService.updateRole(roleId, {
        name,
        permissions,
      })
      return res.json(updatedRole)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  async deleteRole(req, res) {
    const { roleId } = req.params
    try {
      await roleService.removeRole(roleId)
      return res.json({ message: 'Deleted' })
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = RolesController
