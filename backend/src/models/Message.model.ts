import { model, Schema } from 'mongoose'
import { TMessageDocument } from '../types/messages/TMessageDocument'

const MessageSchema = new Schema<TMessageDocument>(
  {
    content: {
      type: String,
      required: true,
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

const Message = model('Message', MessageSchema)

export default Message
