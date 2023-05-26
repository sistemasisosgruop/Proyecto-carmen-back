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
            updated_at: new Date(),
            created_at: new Date(),
            tour_name: 'Machu Picchu Adventure',
            tour_description:
              'Join us on an exciting adventure to Machu Picchu!',
            location: 'Machu Picchu',
            duration: '3 days',
            difficulty: 'Moderate',
            languages: ['English', 'Spanish'],
            number_of_people: '10',
            ages: '18+',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      )
      // Crear los detalles adicionales de la habitación en la tabla 'Tours_Info'
      await queryInterface.bulkInsert(
        'Tours_Info',
        [
          {
            tour_id: tourId,
            image_url: [
              'https://bucket-carmen-travel.s3.us-east-1.amazonaws.com/public/tours/photos/c254fb7f-28ca-4496-a890-43b984d7e713/image-1685135674775-626384606.jpg',
              'https://bucket-carmen-travel.s3.us-east-1.amazonaws.com/public/tours/photos/c254fb7f-28ca-4496-a890-43b984d7e713/image-1685135674778-333714350.jpg',
              'https://bucket-carmen-travel.s3.us-east-1.amazonaws.com/public/tours/photos/c254fb7f-28ca-4496-a890-43b984d7e713/image-1685135674787-7978674.jpg',
              'https://bucket-carmen-travel.s3.us-east-1.amazonaws.com/public/tours/photos/c254fb7f-28ca-4496-a890-43b984d7e713/image-1685135674789-702266084.jpeg',
            ],
            what_to_do:
              'Explore the ancient ruins, hike to the Sun Gate, and enjoy breathtaking views.',
            good_choise_for: 'Adventure seekers and history enthusiasts.',
            cancellation_policy:
              'Full refund if canceled at least 48 hours before the tour.',
            price_per_person: 250.0,
            available_dates: [new Date(), new Date()],
            schedule:
              'Day 1: Arrival and orientation. Day 2: Machu Picchu guided tour. Day 3: Return journey.',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ],
        { transaction }
      )
      // Crear los detalles adicionales de la habitación en la tabla 'Tours_Details'
      await queryInterface.bulkInsert(
        'Tours_Details',
        [
          {
            tour_id: tourId,
            what_is_included:
              'Transportation, accommodation, meals, guide, entrance fees.',
            what_is_not_included: 'Airfare, personal expenses.',
            itinerary: [
              'Day 1: Arrival and orientation.',
              'Day 2: Machu Picchu guided tour.',
              'Day 3: Return journey.',
            ],
            departure_details: 'Meet at Cusco Airport at 9:00 AM.',
            return_details: 'Drop-off at Cusco Airport at 6:00 PM.',
            accessibility: 'This tour is not wheelchair accessible.',
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
      // Eliminar los registros de la tabla 'Tours_Details'
      await queryInterface.bulkDelete('Tours_Details', null, { transaction })

      // Eliminar los registros de la tabla 'Tours_Info'
      await queryInterface.bulkDelete('Tours_Info', null, { transaction })

      // Eliminar los registros de la tabla 'Tours'
      await queryInterface.bulkDelete('Tours', null, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
}
