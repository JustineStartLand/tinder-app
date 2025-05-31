import User from '../../models/User.model'
import { TSignup } from '../../types/auth/TSignup'
import { TUserDocument } from '../../types/documents/TUserDocument'
import { TUpdateUser } from '../../types/user/TUpdateUser'

type TFindOneDocumentResult = Promise<TUserDocument | null>

export const createUserModel = (userData: TSignup): TUserDocument => {
  return new User(userData)
}

export const saveUserToDb = async (user: TUserDocument) => {
  return await user.save()
}

export const findUserByEmail = async (
  email: string
): TFindOneDocumentResult => {
  return await User.findOne({
    email,
  })
}

export const findUserById = async (userId: string): TFindOneDocumentResult => {
  return await User.findById(userId)
}

export const updateUserById = async (
  userId: string,
  newData: TUpdateUser
): Promise<TUserDocument | null> => {
  return await User.findByIdAndUpdate(userId, newData, { new: true })
}
