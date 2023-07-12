'use strict'
const { v4: uuid4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const departmentId = uuid4() // Genera un ID para la habitación
      const roomId = uuid4()

      // Crear la habitación en la tabla 'Departments'
      await queryInterface.bulkInsert(
        'Departments',
        [
          {
            id: departmentId,
            departmentType: 'Standard Department',
            description:
              'Cozy and affordable department for a comfortable stay.',
            address: '456 Elm Street, Townsville',
            price: 100,
            checkIn: new Date(),
            checkOut: new Date(),
            numBathrooms: 1,
            numBeds: 1,
            numRooms: 3,
            extras: [
              'TV with cable channels',
              'Air conditioning',
              'Mini fridge',
            ],
            details: {
              amenities: ['Swimming pool', 'Restaurant', 'Department service'],
              notIncluded: ['Pets not allowed', 'Smoking not allowed'],
              services: ['24/7 concierge', 'Laundry service'],
            },
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        { transaction }
      )
      // Crear los detalles adicionales de la habitación en la tabla 'DepartmentDetails'
      await queryInterface.bulkInsert(
        'DepartmentRooms',
        [
          {
            id: roomId,
            departmentId: departmentId,
            typeRoom: 'Deluxe Suite',
            numBed: 2,
            typeBed: ['King Bed', 'Normal'],
            numBaths: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
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
      // Eliminar los registros de la tabla 'DepartmentRooms'
      await queryInterface.bulkDelete('DepartmentRooms', null, {
        transaction,
      })

      // Eliminar los registros de la tabla 'Departments'
      await queryInterface.bulkDelete('Departments', null, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
