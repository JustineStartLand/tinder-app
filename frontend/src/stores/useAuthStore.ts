import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import type { TAuthStore } from '../types/Stores.type'
import { disconnectSocket, initializeSocket } from '../connections/socket'

const useAuthStore = create<TAuthStore>((set) => ({
  authUser: null,
  checkingAuth: true,
  isLoggingIn: false,
  isSigningUp: false,
  isLoggingOut: false,

  login: async (loginData) => {
    try {
      set({ isLoggingIn: true })
      const res = await axiosInstance.post('/auth/login', loginData)
      console.log(res.data.data)
      if (res.status === 200) {
        set({ authUser: res.data.data })
        initializeSocket(res.data.data.id)
      }
      toast.success('Log in succesful')
    } catch (e) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while logging you in'
      )
    } finally {
      set({ isLoggingIn: false })
    }
  },

  signUp: async (signUpData) => {
    try {
      set({ isSigningUp: true })
      const res = await axiosInstance.post('/auth/signup', signUpData)
      console.log(res.data.data)
      set({
        authUser: res.data.data,
      })
      toast.success('Sign up successful')
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while signing you up'
      )
    } finally {
      set({ isSigningUp: false })
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true })
      const res = await axiosInstance.get('/auth/me')
      if (res.status === 200) {
        set({ authUser: res.data.data })
        initializeSocket(res.data.data.id)
      }
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'An unknown error occurred while checking auth'
      )
    } finally {
      set({ checkingAuth: false })
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true })
      const res = await axiosInstance.post('/auth/logout')

      if (res.status === 200) {
        set({ authUser: null })
        disconnectSocket()
      }

      toast.success(res.data.message || 'Log out successful')
    } catch (e) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while logging you out'
      )
    } finally {
      set({ isLoggingOut: false })
    }
  },
}))

export default useAuthStore
