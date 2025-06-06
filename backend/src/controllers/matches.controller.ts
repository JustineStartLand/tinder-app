import { Request } from 'express'
import { asyncHandler } from '../lib/handlers/async-handler'
import {
  findMatchesByUserId,
  findUserProfiles,
} from '../db/services/matches.service'
import { createErrorClass } from '../lib/utils'
import {
  NOT_FOUND_ERROR_CODE,
  STATUS_OK_SUCCESS_CODE,
} from '../lib/constants/statusCodes'
import { Types } from 'mongoose'
import { findUserById, saveUserToDb } from '../db/services/user.service'
import { TUserDocument } from '../types/documents/TUserDocument'
import { getConnectedUsers, getIO } from '../connections/socket'

export const swipeRight = asyncHandler(
  async (
    req: Request<{ likedUserId: string }, any, any, any, Record<string, any>>,
    res,
    next
  ) => {
    const loggedInUser = req.user!
    const { likedUserId } = req.params
    const likedUser = await findUserById(likedUserId)
    if (!likedUser) {
      return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
    }
    const alreadyLiked = loggedInUser.likes.some(
      (id) => id.toString() === likedUserId
    )

    let savedUser: TUserDocument = loggedInUser
    if (!alreadyLiked) {
      loggedInUser.likes.push(new Types.ObjectId(likedUserId))
      savedUser = await saveUserToDb(loggedInUser)

      const hasOtherUserAlreadyLikedUs = likedUser.likes.some(
        (id) => id.toString() === (loggedInUser.id as Types.ObjectId).toString()
      )
      // If the other user already liked us too, it's a match, so let's update the match for both users
      if (hasOtherUserAlreadyLikedUs) {
        likedUser.matches.push(loggedInUser._id as Types.ObjectId)
        loggedInUser.matches.push(likedUser._id as Types.ObjectId)
        let [savedUserPromise, _] = await Promise.all([
          saveUserToDb(loggedInUser),
          saveUserToDb(likedUser),
        ])
        savedUser = savedUserPromise
        // TODO SEND NOTIFICATION IF IT IS A MATCH => SOCKET.IO
        const connectedUsers = getConnectedUsers()
        const likedUserSocketId = connectedUsers.get(likedUser.id)
        const io = getIO()

        if (likedUserSocketId) {
          io.to(likedUserSocketId).emit('newMatch', {
            id: loggedInUser.id,
            name: loggedInUser.name,
            image: loggedInUser.image,
          })
        }
        //
        const loggedInUserSocketId = connectedUsers.get(loggedInUser.id)

        if (loggedInUserSocketId) {
          io.to(loggedInUserSocketId).emit('newMatch', {
            id: likedUser.id,
            name: likedUser.name,
            image: likedUser.image,
          })
        }
      }
      res.status(STATUS_OK_SUCCESS_CODE).json({
        success: true,
        data: savedUser,
      })
      return
    }

    res.status(200).json({
      success: true,
      data: savedUser,
    })
  }
)

export const swipeLeft = asyncHandler(
  async (
    req: Request<
      { dislikedUserId: string },
      any,
      any,
      any,
      Record<string, any>
    >,
    res,
    next
  ) => {
    const loggedInUser = req.user!
    const { dislikedUserId } = req.params
    const dislikedUser = await findUserById(dislikedUserId)
    if (!dislikedUser) {
      return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
    }

    const alreadyDisliked = loggedInUser.dislikes.some(
      (id) => id.toString() === dislikedUserId
    )

    let savedUser: TUserDocument = loggedInUser
    if (!alreadyDisliked) {
      loggedInUser.dislikes.push(new Types.ObjectId(dislikedUserId))
      savedUser = await saveUserToDb(loggedInUser)
    }

    res.status(200).json({
      success: true,
      data: savedUser,
    })
  }
)

export const displayMatches = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user!
  const user = await findMatchesByUserId(loggedInUser.id)
  if (!user) {
    return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
  }
  res.status(200).json({
    sucess: true,
    data: user.matches,
  })
})

export const displayUserProfiles = asyncHandler(async (req, res, next) => {
  const loggedInUser = req.user!

  const userProfiles = await findUserProfiles(loggedInUser)
  res.status(STATUS_OK_SUCCESS_CODE).json({
    success: true,
    data: userProfiles,
  })
})
