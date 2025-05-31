import { Types } from 'mongoose'
import Message from '../../models/Message.model'
import {
  TMessage,
  TMessageDocument,
} from '../../types/messages/TMessageDocument'

export const createMessageModel = (messageData: TMessage): TMessageDocument => {
  return new Message(messageData)
}

export const saveMessageToDb = async (
  message: TMessageDocument
): Promise<TMessageDocument> => {
  return await message.save()
}

export const findMessages = async (
  loggedInUserId: Types.ObjectId,
  otherUserId: Types.ObjectId
) => {
  return await Message.find({
    $or: [
      {
        senderId: loggedInUserId,
        receiverId: otherUserId,
      },
      {
        senderId: otherUserId,
        receiverId: loggedInUserId,
      },
    ],
  }).sort('createdAt')
}
