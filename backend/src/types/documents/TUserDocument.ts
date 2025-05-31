import { Document, Types } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: string
  age: number
  gender: string
  genderPreference: string
  bio: string
  image: string
  likes: Types.ObjectId[]
  dislikes: Types.ObjectId[]
  matches: Types.ObjectId[]
  matchPassword: (enteredPassword: string) => Promise<boolean>
}

export type TUserDocument = Document<unknown, {}, TUser> & TUser
