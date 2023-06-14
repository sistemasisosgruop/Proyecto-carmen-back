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
            room_type: 'Standard Room',
            description: 'Cozy and affordable room for a comfortable stay.',
            address: '456 Elm Street, Townsville',
            price: 100,
            check_in: new Date(),
            check_out: new Date(),
            num_bathrooms: 1,
            num_beds: 1,
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
            room_id: roomId,
            type_room: 'Deluxe Suite',
            num_bed: 1,
            type_bed: 'King Bed',
            type_bed_2: 'Sofa Bed',
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
            room_id: roomId,
            amenities: ['Swimming pool', 'Restaurant', 'Room service'],
            not_included: ['Pets not allowed', 'Smoking not allowed'],
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
