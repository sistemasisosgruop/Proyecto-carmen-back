const models = require('../database/models')
const { v4: uuid4 } = require('uuid')
const { CustomError } = require('../utils/custom-error')

class ReservationsService {
  constructor() {}

  async findReservationsByUser(userId) {
    const user = await models.Users.findByPk(userId)
    const departmentReservations = await models.Reservation_Departments.findAll(
      {
        where: {
          userId: user.id,
        },
      }
    )
    const tourReservations = await models.Reservation_Tours.findAll({
      where: {
        userId: user.id,
      },
    })
    return { departmentReservations, tourReservations }
  }

  async findDepartmentReservationById(departmentReservationId) {
    const reservations = await models.Reservation_Departments.findByPk(
      departmentReservationId
    )
    return reservations
  }

  async createDepartmentsReservation(
    userId,
    departmentId,
    reservationDepartmentData
  ) {
    const transaction =
      await models.Reservation_Departments.sequelize.transaction()

    const user = await models.Users.findByPk(userId)
    const department = await models.Departments.findByPk(departmentId)

    if (!user || !department) {
      throw new Error('Error creating the reservation')
    }

    try {
      const reservation = await models.Reservation_Departments.create(
        {
          id: uuid4(),
          userId: user.dataValues.id,
          departmentId: department.dataValues.id,
          typeDepartment: department.dataValues.departmentType,
          checkIn: department.dataValues.checkIn,
          checkOut: department.dataValues.checkOut,
          address: department.dataValues.address,
          purchaseDate: reservationDepartmentData.purchaseDate,
          purchaseTime: reservationDepartmentData.purchaseTime,
          numberOfPeople: reservationDepartmentData.numberOfPeople,
          totalPrice: reservationDepartmentData.totalPrice,
        },
        { transaction }
      )
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateDepartmentReservation(
    departmentReservationId,
    reservationDepartmentData
  ) {
    const transaction =
      await models.Reservation_Departments.sequelize.transaction()

    try {
      const reservation = await models.Reservation_Departments.findByPk(
        departmentReservationId
      )
      if (!reservation) {
        throw new Error('Reservation not found!')
      }

      const editedDepartment = await reservation.update(
        {
          purchaseDate: reservationDepartmentData.purchaseDate,
          purchaseTime: reservationDepartmentData.purchaseTime,
          numberOfPeople: reservationDepartmentData.numberOfPeople,
        },
        { transaction }
      )
      await transaction.commit()
      return editedDepartment
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeDepartmentReservation(departmentReservationId) {
    const transaction =
      await models.Reservation_Departments.sequelize.transaction()
    try {
      let reservation = await models.Reservation_Departments.findByPk(
        departmentReservationId
      )

      if (!reservation)
        throw new CustomError('Not found reservation', 404, 'Not Found')

      await reservation.destroy({ transaction })
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  //! ======================================================================

  async findTourReservationById(tourReservationId) {
    const reservations = await models.Reservation_Tours.findByPk(
      tourReservationId
    )
    return reservations
  }

  async createTourReservation(userId, tourId, reservationTourData) {
    const transaction = await models.Reservation_Tours.sequelize.transaction()

    const user = await models.Users.findByPk(userId)
    const tour = await models.Tours.findByPk(tourId)
    const infoTour = await models.Tours_Info.findOne({
      where: {
        tourId: tourId,
      },
    })

    if (!user || !tour) {
      throw new Error('Error creating the reservation')
    }
    const tourCheckIn = tour.dataValues.tourCheckIn
    const tourCheckout = tour.dataValues.tourCheckOut
    const dateSelected = [tourCheckIn, tourCheckout]
    try {
      const reservation = await models.Reservation_Tours.create(
        {
          id: uuid4(),
          userId: user.dataValues.id,
          tourId: tour.dataValues.id,
          typeTour: tour.dataValues.tourName,
          dateSelected: dateSelected,
          scheduleSelected: infoTour.dataValues.schedule,
          location: tour.dataValues.location,
          purchaseDate: reservationTourData.purchaseDate,
          purchaseTime: reservationTourData.purchaseTime,
          numberOfPeople: reservationTourData.numberOfPeople,
          totalPurchase: reservationTourData.totalPurchase,
        },
        { transaction }
      )
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateTourReservation(tourReservationId, reservationTourData) {
    const transaction = await models.Reservation_Tours.sequelize.transaction()

    try {
      const reservation = await models.Reservation_Tours.findByPk(
        tourReservationId
      )
      if (!reservation) {
        throw new Error('Reservation not found!')
      }

      const editedTourReservation = await reservation.update(
        {
          purchaseDate: reservationTourData.purchaseDate,
          purchaseTime: reservationTourData.purchaseTime,
          numberOfPeople: reservationTourData.numberOfPeople,
        },
        { transaction }
      )
      await transaction.commit()
      return editedTourReservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTourReservation(tourReservationId) {
    const transaction = await models.Reservation_Tours.sequelize.transaction()
    try {
      let reservation = await models.Reservation_Tours.findByPk(
        tourReservationId
      )

      if (!reservation)
        throw new CustomError('Not found reservation', 404, 'Not Found')

      await reservation.destroy({ transaction })
      await transaction.commit()
      return reservation
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = ReservationsService
