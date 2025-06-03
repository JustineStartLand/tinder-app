import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import type { TUpdateUserEntry } from '../types/User.types'
import useAuthStore from './useAuthStore'

type TUserStore = {
  isUpdatingProfile: boolean
  updateProfile: (data: TUpdateUserEntry) => Promise<void>
}
const useUserStore = create<TUserStore>((set) => ({
  isUpdatingProfile: false,

  updateProfile: async (data: TUpdateUserEntry) => {
    console.log('update profile')
    set({ isUpdatingProfile: true })

    try {
      const res = await axiosInstance.put('/users/update', data)
      if (res.status === 200) {
        useAuthStore.setState({ authUser: res.data.data })
      }
      toast.success('Profile updated successfully')
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while updating your profile'
      )
    } finally {
      set({ isUpdatingProfile: false })
    }
  },
}))

export default useUserStore
