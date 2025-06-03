import { Request } from 'express'
import { asyncHandler } from '../lib/handlers/async-handler'
import { TUpdateUser } from '../types/user/TUpdateUser'
import validateUpdateUserBody from '../validators/updateUserBodyValidator'
import { validationResult } from 'express-validator'
import { createErrorClass, createValidationErrorMessage } from '../lib/utils'
import {
  BAD_REQUEST_ERROR_CODE,
  STATUS_OK_SUCCESS_CODE,
} from '../lib/constants/statusCodes'
import cloudinary from '../configurations/cloudinary'
import { updateUserById } from '../db/services/user.service'

export const updateProfile = [
  validateUpdateUserBody,
  asyncHandler(
    async (
      req: Request<any, any, TUpdateUser, any, Record<string, any>>,
      res,
      next
    ) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errMessage = createValidationErrorMessage(errors)
        return next(createErrorClass(errMessage, BAD_REQUEST_ERROR_CODE))
      }

      const { image, ...otherData } = req.body

      let updatedData: TUpdateUser = otherData
      if (image) {
        // base64 format
        if (image.startsWith('data:image')) {
          const uploadRes = await cloudinary.uploader.upload(image)
          updatedData.image = uploadRes.secure_url
        }
      }

      const updatedUser = await updateUserById(req.user!.id, updatedData)

      res.status(STATUS_OK_SUCCESS_CODE).json({
        success: true,
        data: updatedUser,
      })
    }
  ),
]
