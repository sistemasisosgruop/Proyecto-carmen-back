'use strict'
const { v4: uuid4 } = require('uuid')

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      const tourId = uuid4() // Genera un ID para la habitación

      // Crear la habitación en la tabla 'Tours'
      await queryInterface.bulkInsert(
        'Tours',
        [
          {
            id: tourId,
            tourName: 'Machu Picchu Adventure',
            tourDescription:
              'Join us on an exciting adventure to Machu Picchu!',
            location: 'Machu Picchu',
            duration: '3 days',
            difficulty: 'Moderate',
            languages: ['English', 'Spanish'],
            numberOfPeople: '10',
            ages: '18+',
            tourInfo: {
              whatToDo:
                'Explore the ancient ruins, hike to the Sun Gate, and enjoy breathtaking views.',
              goodChoiseFor: 'Adventure seekers and history enthusiasts.',
              cancellationPolicy:
                'Full refund if canceled at least 48 hours before the tour.',
              pricePerPerson: 250.0,
              availableDates: [new Date(), new Date()],
              schedule:
                'Day 1: Arrival and orientation. Day 2: Machu Picchu guided tour. SDay 3: Return journey.',
            },
            details: {
              tourId: tourId,
              whatIsIncluded:
                'Transportation, accommodation, meals, guide, entrance fees.',
              whatIsNotIncluded: 'Airfare, personal expenses.',
              itinerary: [
                'Day 1: Arrival and orientation.',
                'Day 2: Machu Picchu guided tour.',
                'Day 3: Return journey.',
              ],
              departureDetails: 'Meet at Cusco Airport at 9:00 AM.',
              returnDetails: 'Drop-off at Cusco Airport at 6:00 PM.',
              accessibility: 'This tour is not wheelchair accessible.',
            },
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
      // Eliminar los registros de la tabla 'Tours'
      await queryInterface.bulkDelete('Tours', null, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
