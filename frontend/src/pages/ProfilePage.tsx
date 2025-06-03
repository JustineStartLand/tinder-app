/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react'
import Header from '../components/Header'
import useAuthStore from '../stores/useAuthStore'
import useUserStore from '../stores/useUserStore'
import type { TGender, TGenderPreference } from '../types/Stores.type'

const ProfilePage = () => {
  const { authUser } = useAuthStore()
  const { isUpdatingProfile: loading, updateProfile } = useUserStore()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const {
    createdAt,
    updatedAt,
    matches,
    likes,
    dislikes,
    id,
    ...userDataToUpdate
  } = authUser!

  const [userData, setUserData] = useState(userDataToUpdate)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    for (const key in userDataToUpdate) {
      const typedKey = key as keyof typeof userDataToUpdate

      if (userDataToUpdate[typedKey] !== userData[typedKey]) {
        updateProfile(userData)
      }
    }
    return
  }

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSetGender = (genderValue: TGender) => {
    setUserData((prev) => ({
      ...prev,
      gender: genderValue,
    }))
  }

  const handleSetGenderPreference = (
    genderPreferenceValue: TGenderPreference
  ) => {
    setUserData((prev) => ({
      ...prev,
      genderPreference: genderPreferenceValue,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fileReader = new FileReader()
    fileReader.onload = () => {
      const result = fileReader.result
      console.log(result)
      setUserData((prev) => ({
        ...prev,
        image: result as string,
      }))
    }
    fileReader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen text-slate-950 bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Your Profile
          </h2>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={userData.age}
                      onChange={handleChange}
                      min={18}
                      max={120}
                      className="apperance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* GENDER */}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </span>
                  <div className="flex space-x-4">
                    {['Male', 'Female'].map((option) => (
                      <label key={option} htmlFor="gender">
                        <input
                          type="radio"
                          className="form-radio text-slate-600"
                          name="gender"
                          value={option.toLowerCase()}
                          checked={userData.gender === option.toLowerCase()}
                          onChange={() =>
                            handleSetGender(option.toLowerCase() as TGender)
                          }
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* GENDER PREFERENCE*/}
                <div>
                  <span className="block text-sm font-medium text-gray-700 mb-2">
                    Gender Preference
                  </span>
                  <div className="flex space-x-4">
                    {['Male', 'Female', 'Both'].map((option) => (
                      <label key={option} htmlFor="gender">
                        <input
                          type="radio"
                          className="form-radio text-slate-600"
                          name="genderPreference"
                          value={option.toLowerCase()}
                          checked={
                            userData.genderPreference === option.toLowerCase()
                          }
                          onChange={() =>
                            handleSetGenderPreference(
                              option.toLowerCase() as TGenderPreference
                            )
                          }
                        />
                        <span className="ml-2">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* BIO */}
                <div className="">
                  <label
                    htmlFor=""
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <div className="mt-1">
                    <textarea
                      name="bio"
                      id="bio"
                      rows={3}
                      value={userData.bio}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* IMAGE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cover Image
                  </label>
                  <div className="mt-1 flex items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                    >
                      Upload Image
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                {userData.image && (
                  <div className="mt-4">
                    <img
                      src={userData.image}
                      alt="User updated image"
                      className="w-48 h-full object-cover rounded-md"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  disabled={loading}
                >
                  {loading ? 'Saving changes...' : 'Save'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
