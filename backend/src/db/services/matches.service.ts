import User from '../../models/User.model'
import { TUserDocument } from '../../types/documents/TUserDocument'

export const findMatchesByUserId = async (userId: string) => {
  return await User.findById(userId).populate({
    path: 'matches',
    select: 'name image id',
  })
}
export const findUserProfiles = async (user: TUserDocument) => {
  return await User.find({
    $and: [
      { _id: { $ne: user._id } },
      { _id: { $nin: user.likes } },
      { _id: { $nin: user.dislikes } },
      { _id: { $nin: user.matches } },
      {
        gender:
          user.genderPreference === 'both'
            ? { $in: ['male', 'female'] }
            : user.genderPreference,
      },
      {
        genderPreference: { $in: [user.gender, 'both'] },
      },
    ],
  })
}
