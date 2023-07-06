const { Op } = require('sequelize')
const models = require('../database/models')
const { raw } = require('express')

class RolesService {
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
      options.where.name = { [Op.iLike]: `%${name}` }
    }
    options.distinct = true

    const roles = await models.Roles.findAndCountAll(options)
    return roles
  }

  async findRoleById(roleId) {
    const role = await models.Roles.findByPk(roleId)
    if (!role) throw new Error('Role not found')
    return role
  }

  async createRole(name, permissions) {
    const transaction = await models.Roles.sequelize.transaction()
    try {
      const role = await models.Roles.create(
        {
          name: name,
          permissions: permissions,
        },
        { transaction }
      )
      await transaction.commit()
      return role
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateRole(roleId, { name, permissions }) {
    const transaction = await models.Roles.sequelize.transaction()

    try {
      const role = await models.Roles.findByPk(roleId)
      if (!role) {
        throw new Error('Role does not exist')
      }
      console.log('HERE ROLE: ', role)
      let updatedRole = await role.update(
        {
          name,
          permissions,
        },
        { transaction }
      )
      console.log(updatedRole)
      await transaction.commit()
      return updatedRole
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeRole(roleId) {
    const transaction = await models.Roles.sequelize.transaction()
    try {
      const role = await models.Roles.findByPk(roleId)
      if (!role) {
        throw new Error('Role not found')
      }
      await role.destroy({ transaction })
      await transaction.commit()
      return role
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = RolesService
