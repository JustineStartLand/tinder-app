import { model, Schema } from 'mongoose'
import { TUserDocument } from '../types/documents/TUserDocument'
import bcrypt from 'bcryptjs'
const UserSchema = new Schema<TUserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
      enum: ['male', 'female'],
    },
    genderPreference: {
      type: String,
      required: true,
      enum: ['male', 'female', 'both'],
    },
    bio: { type: String, default: '' },
    image: { type: String, default: '' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    matches: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
)

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    delete ret.password
  },
})
const User = model('User', UserSchema)

export default User
