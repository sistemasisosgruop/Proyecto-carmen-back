const models = require('../database/models')
const { v4: uuid4 } = require('uuid')
const { CustomError } = require('../utils/custom-error')

class ReservationsService {
  constructor() {}

  async findReservationsByUser(userId) {
    const user = await models.Users.findByPk(userId)
    const roomReservations = await models.Reservation_Rooms.findAll({
      where: {
        user_id: user.id,
      },
    })
    const tourReservations = await models.Reservation_Tours.findAll({
      where: {
        user_id: user.id,
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
          user_id: user.dataValues.id,
          room_id: room.dataValues.id,
          type_room: room.dataValues.room_type,
          check_in: room.dataValues.check_in,
          check_out: room.dataValues.check_out,
          address: room.dataValues.address,
          purchase_date: reservationRoomData.purchase_date,
          purchase_time: reservationRoomData.purchase_time,
          number_of_people: reservationRoomData.number_of_people,
          total_price: reservationRoomData.total_price,
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
          purchase_date: reservationRoomData.purchase_date,
          purchase_time: reservationRoomData.purchase_time,
          number_of_people: reservationRoomData.number_of_people,
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
        tour_id: tourId,
      },
    })

    if (!user || !tour) {
      throw new Error('Error creating the reservation')
    }
    const tourCheckIn = tour.dataValues.tour_check_in
    const tourCheckout = tour.dataValues.tour_check_out
    const dateSelected = [tourCheckIn, tourCheckout]
    try {
      const reservation = await models.Reservation_Tours.create(
        {
          id: uuid4(),
          user_id: user.dataValues.id,
          tour_id: tour.dataValues.id,
          type_tour: tour.dataValues.tour_name,
          date_selected: dateSelected,
          schedule_selected: infoTour.dataValues.schedule,
          location: tour.dataValues.location,
          purchase_date: reservationTourData.purchase_date,
          purchase_time: reservationTourData.purchase_time,
          number_of_people: reservationTourData.number_of_people,
          total_purchase: reservationTourData.total_purchase,
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
          purchase_date: reservationTourData.purchase_date,
          purchase_time: reservationTourData.purchase_time,
          number_of_people: reservationTourData.number_of_people,
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
