import { Document, Types } from 'mongoose'

export type TMessage = {
  content: string
  senderId: Types.ObjectId
  receiverId: Types.ObjectId
}

export type TMessageDocument = Document<unknown, {}, TMessage> & TMessage
