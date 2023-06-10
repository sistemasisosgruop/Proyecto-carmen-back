const models = require('../database/models')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { v4: uuid4 } = require('uuid')
const { uploadFile } = require('../s3')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION

class TourService {
  constructor() {}

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}` }
    }
    options.distinct = true

    const tours = await models.Tours.findAndCountAll(options)
    return tours
  }

  async getTourOr404(tourId) {
    let tour = await models.Tours.findByPk(tourId)
    if (!tour) throw new CustomError('Not found Tour', 404, 'Not Found')
    let tourInfo = await models.Tours_Info.findOne({
      where: {
        tour_id: tourId,
      },
      attributes: {
        exclude: ['id', 'tour_id', 'created_at', 'updated_at'],
      },
    })
    let tourDetail = await models.Tours_Details.findOne({
      where: {
        tour_id: tourId,
      },
      attributes: {
        exclude: ['id', 'tour_id', 'created_at', 'updated_at'],
      },
    })
    return { tour, tourInfo, tourDetail }
  }

  async createTour(userId, tourData, images) {
    const transaction = await models.Tours.sequelize.transaction()
    const user = await models.Users.findByPk(userId)

    try {
      if (user.dataValues.role_id !== 1) {
        throw new Error('Only admins can create New Tours')
      }

      if (!images || images.length === 0) {
        throw new Error('Debe proporcionar al menos una imagen para el tour.')
      }

      const tour = await models.Tours.create(
        {
          id: uuid4(),
          room_type: tourData.room_type,
          description: tourData.description,
          address: tourData.address,
          price: tourData.price,
          check_in: tourData.check_in,
          check_out: tourData.check_out,
          num_bathrooms: tourData.num_bathrooms,
          num_beds: tourData.num_beds,
          extras: tourData.extras,
        },
        { transaction }
      )
      // Guardar las fotos en S3 en lugar de almacenarlas localmente
      const uploadedPhotos = []
      for (const photo of images) {
        const fileKey = `public/tours/photos/${tour.dataValues.id}/${photo.filename}` // Define la clave del archivo en S3

        try {
          await uploadFile(photo, fileKey) // Carga la foto en S3
          const photoUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}` // Genera la URL de acceso a la foto en S3

          uploadedPhotos.push(photoUrl) // Agrega la URL de la foto cargada al array de fotos subidas
        } catch (error) {
          // Manejo de errores al cargar la foto en S3
          console.error(`Error uploading photo ${photo.filename} to S3:`, error)
          // Puedes optar por lanzar una excepción, guardar información sobre el error, etc.
        }
      }

      const tourInfo = await models.Tours_Info.create(
        {
          tour_id: tour.dataValues.id,
          what_to_do: tourData.tour_info.what_to_do,
          good_choise_for: tourData.tour_info.good_choise_for,
          cancellation_policy: tourData.tour_info.cancellation_policy,
          price_per_person: tourData.tour_info.price_per_person,
          available_dates: tourData.tour_info.available_dates,
          schedule: tourData.tour_info.schedule,
        },
        { transaction }
      )

      let images_tour = []
      for (const photoUrl of uploadedPhotos) {
        const image = await models.Images.create(
          {
            id: uuid4(),
            image_url: photoUrl,
            record_id: tourInfo.dataValues.id,
          },
          { transaction }
        )
        images_tour.push(image)
      }
      // Obtener las URL de las imágenes del arreglo `images`
      const imageUrls = images_tour.map((image) => image.dataValues.image_url)
      // Almacenar las URL en la propiedad `images_url` de `tourDetails`
      tourInfo.dataValues.images_url = imageUrls

      const tourDetails = await models.Tours_Details.create(
        {
          tour_id: tour.dataValues.id,
          what_is_included: tourData.tour_details.what_is_included,
          what_is_not_included: tourData.tour_details.what_is_not_included,
          itinerary: tourData.tour_details.itinerary,
          departure_details: tourData.tour_details.departure_details,
          return_details: tourData.tour_details.return_details,
          accessibility: tourData.tour_details.accessibility,
        },
        { transaction }
      )
      await transaction.commit()
      return { tour, tourInfo, tourDetails }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeTour(tourId) {
    const transaction = await models.Tours.sequelize.transaction()
    try {
      let tour = await models.Tours.findByPk(tourId)

      if (!tour) throw new CustomError('Not found tour', 404, 'Not Found')

      await tour.destroy({ transaction })

      await transaction.commit()

      return tour
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateTour(tourId, tourData) {
    const transaction = await models.Tours.sequelize.transaction()
    try {
      let tour = await models.Tours.findByPk(tourId)
      let tourDetails = await models.Tours_Details.findOne({
        where: { tour_id: tourId },
      })
      let tourInfo = await models.Tours_Info.findOne({
        where: { tour_id: tourId },
      })

      if (!tour) throw new CustomError('Not found tour', 404, 'Not Found')
      if (!tourDetails)
        throw new CustomError('Not found user', 404, 'Not Found')
      if (!tourInfo) throw new CustomError('Not found tour', 404, 'Not Found')

      let updatedTour = await tour.update(
        {
          room_type: tourData.room_type,
          description: tourData.description,
          address: tourData.address,
          price: tourData.price,
          check_in: tourData.check_in,
          check_out: tourData.check_out,
          num_bathrooms: tourData.num_bathrooms,
          num_beds: tourData.num_beds,
          extras: tourData.extras,
        },
        { transaction }
      )
      let updatedTourDetail
      if (Object.keys(obj).length == 9) {
        updatedTourDetail = await tourDetails.update(
          {
            what_is_included: tourData.tour_details.what_is_included,
            what_is_not_included: tourData.tour_details.what_is_not_included,
            itinerary: tourData.tour_details.itinerary,
            departure_details: tourData.tour_details.departure_details,
            return_details: tourData.tour_details.return_details,
            accessibility: tourData.tour_details.accessibility,
          },
          { transaction }
        )
      }
      let updatedTourInfo
      if (Object.keys(obj).length == 8) {
        updatedTourInfo = await tourInfo.update(
          {
            what_is_included: tourData.tour_details.what_is_included,
            what_is_not_included: tourData.tour_details.what_is_not_included,
            itinerary: tourData.tour_details.itinerary,
            departure_details: tourData.tour_details.departure_details,
            return_details: tourData.tour_details.return_details,
            accessibility: tourData.tour_details.accessibility,
          },
          { transaction }
        )
      }
      await transaction.commit()

      return { updatedTour, updatedTourDetail, updatedTourInfo }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async createTourRating(userId, tourId, ratingData) {
    const transaction = await models.Ratings.sequelize.transaction()
    const user = await models.Users.findByPk(userId)
    const tour = await models.Tours.findByPk(tourId)

    try {
      if (!user) {
        throw new Error('Only users can rate tours')
      }
      const rating = await models.Ratings.create(
        {
          id: uuid4(),
          tour_id: tour.id, // Opcional si estás valorando un Tour
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

  async findRatingsByTour(tourId) {
    console.log(tourId)
    const ratingsTour = await models.Ratings.findAll({
      where: {
        tour_id: tourId,
      },
    })
    return ratingsTour
  }
}

module.exports = TourService
