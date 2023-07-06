const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
require('dotenv').config()
class DepartmentServices {
  constructor() {}

  //? Get All Departments with pagination
  async findAllDepartments(limit, offset) {
    const departments = await models.Departments.findAndCountAll({
      limit,
      offset,
      distinct: true, // Esta opción es para obtener conteo de departamentos distintas y no todos los models
      include: [
        {
          model: models.Department_Details,
          as: 'Department_Details',
          attributes: ['amenities', 'notIncluded', 'services'],
          required: true,
          duplicating: false,
        },
        {
          model: models.Department_Rooms,
          as: 'Department_Rooms',
          attributes: [
            'typeRoom',
            'numBed',
            'typeBed',
            'numBathrooms',
            'ímage',
          ],
          required: true,
          duplicating: false,
        },
        {
          model: models.Department_Images,
          as: 'Department_Images',
          attributes: ['id', 'imageUrl', 'order'],
          required: false,
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      raw: true,
      nest: true,
    })

    const { count, rows: results } = departments
    const totalPages = Math.ceil(count / limit)

    // Group the images for the department
    const groupedResults = results.reduce((acc, department) => {
      const departmentId = department.id
      if (!acc[departmentId]) {
        acc[departmentId] = {
          ...department,
          Department_Images: [],
        }
      }
      if (department.Department_Images.id) {
        acc[departmentId].Department_Images.push(department.Department_Images)
      }
      return acc
    }, {})

    //? Object to array of groupedResults
    const finalResults = Object.values(groupedResults)

    return { count, totalPages, results: finalResults }
  }

  //? Get Department by Id
  async getDepartmentOr404(departmentId) {
    let department = await models.Departments.findByPk(departmentId)
    if (!department)
      throw new CustomError('Not found Department', 404, 'Not Found')

    let departmentDetails = await models.Department_Details.findOne({
      where: {
        departmentId: departmentId,
      },
      attributes: {
        exclude: ['id', 'departmentId', 'createdAt', 'updatedAt'],
      },
    })

    let departmentRooms = await models.Department_Rooms.findOne({
      where: {
        departmentId: departmentId,
      },
      attributes: {
        exclude: ['id', 'departmentId', 'createdAt', 'updatedAt'],
      },
    })

    let departmentImages = await models.department_Images.findAll({
      where: {
        departmentId: departmentId,
      },
      attributes: {
        exclude: ['id', 'departmentId', 'createdAt', 'updatedAt'],
      },
    })

    //? Add departmentDetail and departmentRooms into department
    department.dataValues.departmentRooms = departmentRooms
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
          amenities: departmentData.numRoom.amenities,
          notIncluded: departmentData.numRoom.notIncluded,
          services: departmentData.numRoom.services,
        },
        { transaction }
      )

      const departmentRoom = await models.Department_Rooms.create(
        {
          departmentId: department.dataValues.id,
          typeRoom: departmentData.details.typeRoom,
          numBed: departmentData.details.numBed,
          typeBed: departmentData.details.typeBed,
          numBathrooms: departmentData.details.numBathrooms,
          image: departmentData.details.image,
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
