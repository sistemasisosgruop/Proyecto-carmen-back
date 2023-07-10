const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op } = require('sequelize')
require('dotenv').config()
class DepartmentServices {
  constructor() {}

  //? Get All Departments with pagination
  async findAndCount(query) {
    const options = {
      where: {},
      include: [
        {
          model: models.Department_Details,
          as: 'Department_Details',
          attributes: ['amenities', 'notIncluded', 'services'],
        },
        {
          model: models.Department_Rooms,
          as: 'Department_Rooms',
          attributes: ['typeRoom', 'numBed', 'typeBed', 'numBaths'],
        },
        // {
        // model: models.Images,
        // as: 'Images',
        // attributes: ['id', 'imageUrl', 'order'],
        // },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
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
    options.distinct = true

    console.log('AQUI')
    const departments = await models.Departments.findAndCountAll(options)
    return departments
  }

  // //? Get Department by Id
  async getDepartmentOr404(departmentId) {
    let department = await models.Departments.findByPk(departmentId)
    if (!department)
      throw new CustomError('Not found Department', 404, 'Not Found')

    let departmentDetails = await models.Department_Details.findOne({
      where: {
        departmentId: department.dataValues.id,
      },
      attributes: {
        exclude: ['id', 'departmentId', 'createdAt', 'updatedAt'],
      },
    })
    let departmentRoom = await models.Department_Rooms.findOne({
      where: {
        departmentId: department.dataValues.id,
      },
      attributes: {
        exclude: ['departmentId', 'createdAt', 'updatedAt'],
      },
    })

    const roomId = departmentRoom.dataValues.id

    let roomImages = await models.Images.findAll({
      where: {
        productId: roomId,
      },
      attributes: {
        exclude: ['id', 'productId', 'createdAt', 'updatedAt'],
      },
    })

    let departmentImages = await models.Images.findAll({
      where: {
        productId: departmentId,
      },
      attributes: {
        exclude: ['id', 'productId', 'createdAt', 'updatedAt'],
      },
    })

    //? Add departmentDetail and departmentRooms into department
    department.dataValues.departmentRoom = departmentRoom
    department.dataValues.departmentRoom.dataValues.roomImages = roomImages
    department.dataValues.departmentDetails = departmentDetails
    department.dataValues.departmentImages = departmentImages

    return department
  }

  //? Create a new Department with details being a admin
  async createDepartment(departmentData) {
    const transaction = await models.Departments.sequelize.transaction()
    try {
      const department = await models.Departments.create(
        {
          id: uuid4(),
          departmentType: departmentData.departmentType,
          description: departmentData.description,
          address: departmentData.address,
          price: departmentData.price,
          checkIn: departmentData.checkIn,
          checkOut: departmentData.checkOut,
          numBathrooms: departmentData.numBathrooms,
          numBeds: departmentData.numBeds,
          numRooms: departmentData.numRooms,
          extras: departmentData.extras,
        },
        { transaction }
      )

      const departmentDetails = await models.Department_Details.create(
        {
          departmentId: department.dataValues.id,
          amenities: departmentData.departmentDetails.amenities,
          notIncluded: departmentData.departmentDetails.notIncluded,
          services: departmentData.departmentDetails.services,
        },
        { transaction }
      )

      const departmentRoom = await models.Department_Rooms.create(
        {
          id: uuid4(),
          departmentId: department.dataValues.id,
          typeRoom: departmentData.departmentRooms.typeRoom,
          numBed: departmentData.departmentRooms.numBed,
          typeBed: departmentData.departmentRooms.typeBed,
          numBaths: departmentData.departmentRooms.numBaths,
        },
        { transaction }
      )

      await transaction.commit()
      return { department, departmentDetails, departmentRoom }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeDepartment(departmentId) {
    const transaction = await models.Departments.sequelize.transaction()
    try {
      let department = await models.Departments.findByPk(departmentId)

      if (!department)
        throw new CustomError('Not found department', 404, 'Not Found')

      await department.destroy({ transaction })
      await transaction.commit()
      return department
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  //? Create new department rating and comment
  async createDepartmentRating(departmentId, ratingData) {
    const transaction = await models.Ratings.sequelize.transaction()
    const department = await models.Departments.findByPk(departmentId)

    try {
      const rating = await models.Ratings.create(
        {
          id: uuid4(),
          departmentId: department.id, // Opcional si estás valorando una habitación
          rate: ratingData.rate,
          comment: ratingData.comment,
        },
        { transaction }
      )
      await transaction.commit()
      return rating
    } catch (error) {
      await transaction.rollback()
      // Error al crear la valoración y comentario
      throw error
    }
  }

  async findRatingsByDepartment(departmentId) {
    const ratingsDepartment = await models.Ratings.findAll({
      where: {
        departmentId: departmentId,
      },
    })
    return ratingsDepartment
  }
}

module.exports = DepartmentServices
