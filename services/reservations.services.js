const models = require('../database/models')
const { v4: uuid4 } = require('uuid')
const { CustomError } = require('../utils/custom-error')

class ReservationsService {
  constructor() {}

  async findReservationsByUser(userId) {
    const user = await models.Users.findByPk(userId)
    const roomReservations = await models.Reservation_Rooms.findAll({
      where: {
        userId: user.id,
      },
    })
    const tourReservations = await models.Reservation_Tours.findAll({
      where: {
        userId: user.id,
      },
    })
    return { roomReservations, tourReservations }
  }

  async findRoomReservationById(roomReservationId) {
    const reservations = await models.Reservation_Rooms.findByPk(
      roomReservationId
    )
    return reservations
  }

  async createRoomReservation(userId, roomId, reservationRoomData) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()

    const user = await models.Users.findByPk(userId)
    const room = await models.Rooms.findByPk(roomId)

    if (!user || !room) {
      throw new Error('Error creating the reservation')
    }

    try {
      const reservation = await models.Reservation_Rooms.create(
        {
          id: uuid4(),
          userId: user.dataValues.id,
          roomId: room.dataValues.id,
          typeRoom: room.dataValues.roomType,
          checkIn: room.dataValues.checkIn,
          checkOut: room.dataValues.checkOut,
          address: room.dataValues.address,
          purchaseDate: reservationRoomData.purchaseDate,
          purchaseTime: reservationRoomData.purchaseTime,
          numberOfPeople: reservationRoomData.numberOfPeople,
          totalPrice: reservationRoomData.totalPrice,
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

  async updateRoomReservation(roomReservationId, reservationRoomData) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()

    try {
      const reservation = await models.Reservation_Rooms.findByPk(
        roomReservationId
      )
      if (!reservation) {
        throw new Error('Reservation not found!')
      }

      const editedRoom = await reservation.update(
        {
          purchaseDate: reservationRoomData.purchaseDate,
          purchaseTime: reservationRoomData.purchaseTime,
          numberOfPeople: reservationRoomData.numberOfPeople,
        },
        { transaction }
      )
      await transaction.commit()
      return editedRoom
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeRoomReservation(roomReservationId) {
    const transaction = await models.Reservation_Rooms.sequelize.transaction()
    try {
      let reservation = await models.Reservation_Rooms.findByPk(
        roomReservationId
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
