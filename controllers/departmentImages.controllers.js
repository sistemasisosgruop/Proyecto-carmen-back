const { uploadFile, unlinkFile, deleteFile } = require('../s3')
const DepartmentImagesService = require('../services/departmentImages.services')
const { CustomError } = require('../utils/custom-error')

const imageService = new DepartmentImagesService()

class DepartmentImagesController {
  constructor() {}

  async uploadImageDepartment(req, res, next) {
    const { departmentId } = req.params
    const files = req.files

    try {
      if (files.length < 1)
        throw new CustomError('No images received', 400, 'Bad Request')

      let imagesKeys = []
      let imagesErrors = []

      let openSpots = await imageService.getAvailableImageOrders(departmentId)

      await Promise.all(
        openSpots.map(async (spot, index) => {
          try {
            /* In case Open Spots > Images Posted */
            if (!files[index]) return

            let fileKey = `public/departments/images/image-${departmentId}-${spot}`

            if (files[index].mimetype == 'image/png') {
              fileKey = `public/departments/images/image-${departmentId}-${spot}.png`
            }

            if (files[index].mimetype == 'image/jpg') {
              fileKey = `public/departments/images/image-${departmentId}-${spot}.jpg`
            }

            if (files[index].mimetype == 'image/jpeg') {
              fileKey = `public/departments/images/image-${departmentId}-${spot}.jpeg`
            }

            await uploadFile(files[index], fileKey)

            let bucketURL = process.env.AWS_DOMAIN + fileKey

            await imageService.createImage(departmentId, bucketURL, spot)

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

  async removeDepartmentImage(req, res, next) {
    const departmentId = req.params.id
    const order = req.params.order
    try {
      let { imageUrl } = await imageService.getImageOr404(departmentId, order)
      let awsDomain = process.env.AWS_DOMAIN
      const imageKey = imageUrl.replace(awsDomain, '')
      await deleteFile(imageKey)
      let departmentImage = await imageService.removeImage(departmentId, order)
      res.status(200).json({ message: 'Removed', image: departmentImage })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = DepartmentImagesController
