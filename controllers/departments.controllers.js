const { getPagination, getPagingData } = require('../utils/pagination')
const DepartmentsService = require('../services/departments.services')

const departmentsService = new DepartmentsService()

class DepartmentControllers {
  //? Get All Departments with Pagination
  async getAllDepartments(req, res) {
    try {
      let query = req.query
      let { page, size } = query

      const { limit, offset } = getPagination(page, size, '10')
      query.limit = limit
      query.offset = offset

      let department = await departmentsService.findAndCount(query)
      const results = getPagingData(department, page, limit)
      return res.json(results)
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
  }

  //? Get department by Id
  async getDepartment(req, res) {
    try {
      let { departmentId } = req.params
      let department = await departmentsService.getDepartmentOr404(departmentId)
      return res.json(department)
    } catch (error) {
      return res.status(404).json({ message: 'Invalid ID' })
    }
  }

  //? Create a new department with details being a admin
  async postDepartment(req, res) {
    const {
      departmentType,
      description,
      address,
      price,
      checkIn,
      checkOut,
      numBathrooms,
      numBeds,
      numRooms,
      extras,
      details,
      departmentRooms,
    } = req.body

    try {
      const departmentData = {
        departmentType,
        description,
        address,
        price,
        checkIn,
        checkOut,
        numBathrooms,
        numBeds,
        numRooms,
        extras,
        details,
        departmentRooms,
      }

      const department = await departmentsService.createDepartment(
        departmentData
      )
      return res.status(201).json(department)
    } catch (error) {
      return res.status(401).json({
        message: error.message,
        fields: {
          departmentType: 'String',
          description: 'Text',
          address: 'String',
          price: 'Number',
          checkIn: 'Date',
          checkOut: 'Date',
          numBathrooms: 'Number',
          numBeds: 'Number',
          numRooms: 'Number',
          extras: ['String', 'String2'],
          details: {
            amenities: ['String', 'String2'],
            notIncluded: ['String', 'String2'],
            services: ['String', 'String2'],
          },
          departmentRooms: {
            typeRoom: 'String',
            numBed: 'Number',
            typeBed: ['String', 'String2'],
            numBaths: 'Number',
            image: 'String',
          },
        },
      })
    }
  }

  async patchDepartment(req, res) {
    const departmentId = req.params
    const {
      departmentType,
      description,
      address,
      price,
      checkIn,
      checkOut,
      numBathrooms,
      numBeds,
      numRooms,
      extras,
      details,
    } = req.body
    try {
      const departmentData = {
        departmentType,
        description,
        address,
        price,
        checkIn,
        checkOut,
        numBathrooms,
        numBeds,
        numRooms,
        extras,
        details,
      }
      const department = await departmentsService.updateDepartment(
        departmentId,
        departmentData
      )
      return res.json(department)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }

  async deleteDepartment(req, res) {
    try {
      let { departmentId } = req.params
      let department = await departmentsService.removeDepartment(departmentId)
      return res.status(201).json({ results: department, message: 'removed' })
    } catch (error) {
      res.status(401).json({ message: error.message })
    }
  }

  async postDepartmentRating(req, res) {
    const { departmentId } = req.params
    const { rate, comment } = req.body

    try {
      const ratingData = {
        rate,
        comment,
      }

      if (!ratingData.rate || !ratingData.comment) {
        throw new Error('All fields are required!')
      }

      const rating = await departmentsService.createDepartmentRating(
        departmentId,
        ratingData
      )
      return res.status(201).json(rating)
    } catch (error) {
      return res.status(400).json({
        message: error.message,
        fields: {
          rate: 'Float',
          comment: 'Text',
        },
      })
    }
  }

  async getRatingsByDepartment(req, res) {
    const { departmentId } = req.params

    try {
      const ratesDepartment = await departmentsService.findRatingsByDepartment(
        departmentId
      )
      return res.status(200).json(ratesDepartment)
    } catch (error) {
      return res.status(401).json({ message: error.message })
    }
  }
}

module.exports = DepartmentControllers
