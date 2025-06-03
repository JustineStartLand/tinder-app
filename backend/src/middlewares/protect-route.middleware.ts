import config from '../core/config'
import { findUserById } from '../db/services/user.service'
import {
  NOT_FOUND_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} from '../lib/constants/statusCodes'
import { asyncHandler } from '../lib/handlers/async-handler'
import { createErrorClass } from '../lib/utils'
import jwt, { JwtPayload } from 'jsonwebtoken'
export const protectRoute = asyncHandler(async (req, res, next) => {
  console.log('hell')
  const token = req.cookies.jwt

  if (!token) {
    return next(
      createErrorClass(
        'Unauthorized - No token provided',
        UNAUTHORIZED_ERROR_CODE
      )
    )
  }
  const decodedToken = jwt.verify(token, config.JWT_SECRET_KEY) as JwtPayload

  if (!decodedToken) {
    return next(
      createErrorClass(
        'Unauthorized - Invalid token provided',
        UNAUTHORIZED_ERROR_CODE
      )
    )
  }

  const currentUser = await findUserById(decodedToken.userId)

  if (!currentUser) {
    return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
  }
  req.user = currentUser
  next()
})
