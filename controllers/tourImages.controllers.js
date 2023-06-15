const { uploadFile, unlinkFile, deleteFile } = require('../s3')
const TourImagesService = require('../services/tourImages.services')
const { CustomError } = require('../utils/custom-error')

const imageService = new TourImagesService()

class TourImagesController {
  constructor() {}

  async uploadImageTour(req, res, next) {
    const { tourId } = req.params
    const files = req.files

    try {
      if (files.length < 1)
        throw new CustomError('No images received', 400, 'Bad Request')

      let imagesKeys = []
      let imagesErrors = []

      let openSpots = await imageService.getAvailableImageOrders(tourId)

      await Promise.all(
        openSpots.map(async (spot, index) => {
          try {
            /* In case Open Spots > Images Posted */
            if (!files[index]) return

            let fileKey = `public/tours/images/image-${tourId}-${spot}`

            if (files[index].mimetype == 'image/png') {
              fileKey = `public/tours/images/image-${tourId}-${spot}.png`
            }

            if (files[index].mimetype == 'image/jpg') {
              fileKey = `public/tours/images/image-${tourId}-${spot}.jpg`
            }

            if (files[index].mimetype == 'image/jpeg') {
              fileKey = `public/tours/images/image-${tourId}-${spot}.jpeg`
            }

            await uploadFile(files[index], fileKey)

            let bucketURL = process.env.AWS_DOMAIN + fileKey

            await imageService.createImage(tourId, bucketURL, spot)

            imagesKeys.push(bucketURL)
          } catch (error) {
            imagesErrors.push(error.message)
          }
        })
      )

      //At the end of everything, clean the server from the images
      await Promise.all(
        files.map(async (file) => {
          try {
            await unlinkFile(file.path)
          } catch (error) {
            //
          }
        })
      )

      return res.status(200).json({
        results: {
          message: `Count of uploaded images: ${imagesKeys.length} `,
          imagesUploaded: imagesKeys,
          imageErrors: imagesErrors,
        },
      })
    } catch (error) {
      if (files) {
        await Promise.all(
          files.map(async (file) => {
            try {
              await unlinkFile(file.path)
            } catch (error) {
              //
            }
          })
        )
      }
      return next(error)
    }
  }

  async removeTourImage(req, res, next) {
    const tourId = req.params.id
    const order = req.params.order
    try {
      let { image_url } = await imageService.getImageOr404(tourId, order)
      let awsDomain = process.env.AWS_DOMAIN
      const imageKey = image_url.replace(awsDomain, '')
      await deleteFile(imageKey)
      let tourImage = await imageService.removeImage(tourId, order)

      return res.status(200).json({ message: 'Removed', image: tourImage })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TourImagesController
