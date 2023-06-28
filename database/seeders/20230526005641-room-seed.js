'use strict'
const { v4: uuid4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const roomId = uuid4() // Genera un ID para la habitación

      // Crear la habitación en la tabla 'Rooms'
      await queryInterface.bulkInsert(
        'Rooms',
        [
          {
            id: roomId,
            roomType: 'Standard Room',
            description: 'Cozy and affordable room for a comfortable stay.',
            address: '456 Elm Street, Townsville',
            price: 100,
            checkIn: new Date(),
            checkOut: new Date(),
            numBathrooms: 1,
            numBeds: 1,
            extras: [
              'TV with cable channels',
              'Air conditioning',
              'Mini fridge',
            ],
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      )
      // Crear los detalles adicionales de la habitación en la tabla 'Room_Details'
      await queryInterface.bulkInsert(
        'Room_Details',
        [
          {
            roomId: roomId,
            typeRoom: 'Deluxe Suite',
            numBed: 1,
            typeBed: 'King Bed',
            typeBed_2: 'Sofa Bed',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      )
      // Crear los detalles adicionales de la habitación en la tabla 'Room_Details_2'
      await queryInterface.bulkInsert(
        'Room_Details_2',
        [
          {
            roomId: roomId,
            amenities: ['Swimming pool', 'Restaurant', 'Room service'],
            notIncluded: ['Pets not allowed', 'Smoking not allowed'],
            services: ['24/7 concierge', 'Laundry service'],
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      )

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      // Eliminar los registros de la tabla 'Room_Details_2'
      await queryInterface.bulkDelete('Room_Details_2', null, { transaction })

      // Eliminar los registros de la tabla 'Room_Details'
      await queryInterface.bulkDelete('Room_Details', null, { transaction })

      // Eliminar los registros de la tabla 'Rooms'
      await queryInterface.bulkDelete('Rooms', null, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
