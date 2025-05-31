import { validationResult } from 'express-validator'
import { asyncHandler } from '../lib/handlers/async-handler'
import validateSignupBody from '../validators/signupBodyValidator'
import { createErrorClass, createValidationErrorMessage } from '../lib/utils'
import {
  BAD_REQUEST_ERROR_CODE,
  CREATED_SUCCESS_CODE,
  NOT_FOUND_ERROR_CODE,
  STATUS_OK_SUCCESS_CODE,
} from '../lib/constants/statusCodes'
import { Request } from 'express'
import { TSignup } from '../types/auth/TSignup'
import {
  createUserModel,
  findUserByEmail,
  saveUserToDb,
} from '../db/services/user.service'
import { issueJWT, saveJwtToCookie } from '../securities/token'
import validateLoginBody from '../validators/loginBodyValidator'
import { TLogin } from '../types/auth/TLogin'

export const login = [
  validateLoginBody,
  asyncHandler(
    async (
      req: Request<any, any, TLogin, any, Record<string, any>>,
      res,
      next
    ) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errMessage = createValidationErrorMessage(errors)
        return next(createErrorClass(errMessage, BAD_REQUEST_ERROR_CODE))
      }
      const { email, password } = req.body
      const user = await findUserByEmail(email)
      if (!user) {
        return next(
          createErrorClass('Invalid email or password', NOT_FOUND_ERROR_CODE)
        )
      }
      const isPasswordMatch = user.matchPassword(password)

      if (!isPasswordMatch) {
        return next(
          createErrorClass('Invalid email or password', NOT_FOUND_ERROR_CODE)
        )
      }

      const jwt = issueJWT(user.id)
      saveJwtToCookie(res, jwt)

      res.status(STATUS_OK_SUCCESS_CODE).json({
        success: true,
        data: user,
      })
    }
  ),
]

export const signup = [
  validateSignupBody,
  asyncHandler(
    async (
      req: Request<any, any, TSignup, any, Record<string, any>>,
      res,
      next
    ) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errMessage = createValidationErrorMessage(errors)
        return next(createErrorClass(errMessage, BAD_REQUEST_ERROR_CODE))
      }

      const newUser = createUserModel(req.body)
      const savedUser = await saveUserToDb(newUser)

      const jwt = issueJWT(savedUser.id)
      saveJwtToCookie(res, jwt)

      res.status(CREATED_SUCCESS_CODE).json({
        success: true,
      })
    }
  ),
]

export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('jwt')
  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: 'Logged out successfully',
  })
})

export const displayLoggedInUser = asyncHandler(async (req, res, next) => {
  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: req.user,
  })
})
