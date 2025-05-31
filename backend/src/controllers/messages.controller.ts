import { Request } from 'express'
import { asyncHandler } from '../lib/handlers/async-handler'
import { TMessageEntry } from '../types/messages/TMessageEntry'
import {
  createMessageModel,
  findMessages,
  saveMessageToDb,
} from '../db/services/message.service'
import { TMessage } from '../types/messages/TMessageDocument'
import {
  CREATED_SUCCESS_CODE,
  NOT_FOUND_ERROR_CODE,
  STATUS_OK_SUCCESS_CODE,
} from '../lib/constants/statusCodes'
import { findUserById } from '../db/services/user.service'
import { createErrorClass } from '../lib/utils'
import { Types } from 'mongoose'

export const sendMessage = asyncHandler(
  async (
    req: Request<any, any, TMessageEntry, any, Record<string, any>>,
    res,
    next
  ) => {
    const loggedInUser = req.user!
    const { content, receiverId } = req.body
    const messageObject: TMessage = {
      content,
      senderId: loggedInUser._id as Types.ObjectId,
      receiverId: new Types.ObjectId(receiverId),
    }
    const newMessage = createMessageModel(messageObject)
    const savedMessage = await saveMessageToDb(newMessage)
    res.status(CREATED_SUCCESS_CODE).json({
      success: true,
      data: savedMessage,
    })
  }
)
export const displayConversation = asyncHandler(
  async (
    req: Request<{ userId: string }, any, any, any, Record<string, any>>,
    res,
    next
  ) => {
    const loggedInUser = req.user!
    const { userId } = req.params

    const user = await findUserById(userId)

    if (!user) {
      return next(createErrorClass('User not found', NOT_FOUND_ERROR_CODE))
    }

    const messages = await findMessages(
      loggedInUser._id as Types.ObjectId,
      new Types.ObjectId(userId)
    )

    res.status(STATUS_OK_SUCCESS_CODE).json({
      success: true,
      data: messages,
    })
  }
)
