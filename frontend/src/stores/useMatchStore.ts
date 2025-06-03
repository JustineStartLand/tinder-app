import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import type {
  TSwipeFeedback,
  TUser,
  TUserWithMatches,
} from '../types/Stores.type'
import { getSocket } from '../connections/socket'

type TMatchStore = {
  matches: TUserWithMatches[]
  userProfiles: TUser[]
  isFetchingMatches: boolean
  isFetchingUserProfiles: boolean
  isSwipingRight: boolean
  isSwipingLeft: boolean
  swipeFeedback: TSwipeFeedback | null

  getMyMatches: () => Promise<void>
  getUserProfiles: () => Promise<void>
  swipeLeft: (dislikedUserId: string) => Promise<void>
  swipeRight: (likedUserId: string) => Promise<void>
  setSwipeFeedBackToNull: () => number
  subscribeToNewMatches: () => void
  unsubscribeFromNewMatches: () => void
}

const useMatchStore = create<TMatchStore>((set, get) => ({
  matches: [],
  userProfiles: [],
  isFetchingMatches: false,
  isFetchingUserProfiles: false,
  isSwipingRight: false,
  isSwipingLeft: false,
  swipeFeedback: null,

  setSwipeFeedBackToNull: () =>
    setTimeout(() => set({ swipeFeedback: null }), 2000),

  getMyMatches: async () => {
    set({ isFetchingMatches: true })
    try {
      const res = await axiosInstance.get('/matches')
      set({ matches: res.data.data })
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while fetching your matches'
      )
      set({ matches: [] })
    } finally {
      set({ isFetchingMatches: false })
    }
  },

  getUserProfiles: async () => {
    try {
      set({ isFetchingUserProfiles: true })
      const res = await axiosInstance.get('/matches/user-profiles')

      set({ userProfiles: res.data.data })
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Somewthing went wrong while fetching user profiles'
      )
      set({ userProfiles: [] })
    } finally {
      set({ isFetchingUserProfiles: false })
    }
  },

  swipeLeft: async (dislikedUserId) => {
    try {
      set({ isSwipingLeft: true })
      set({ swipeFeedback: 'passed' })
      await axiosInstance.post(`/matches/swipe-left/${dislikedUserId}`)
    } catch (e: unknown) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Failed to swipe left'
      )
    } finally {
      set({ isSwipingLeft: false })
      get().setSwipeFeedBackToNull()
    }
  },

  swipeRight: async (likedUserId) => {
    try {
      set({ isSwipingRight: true })
      set({ swipeFeedback: 'liked' })
      await axiosInstance.post(`/matches/swipe-right/${likedUserId}`)

      toast.success('Liked user')
    } catch (e: unknown) {
      console.log(e)
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Failed to swipe right'
      )
    } finally {
      set({ isSwipingRight: false })
      get().setSwipeFeedBackToNull()
    }
  },

  subscribeToNewMatches: () => {
    try {
      const socket = getSocket()

      socket.on('newMatch', (newMatch) => {
        set((state) => ({
          matches: [...state.matches, newMatch],
        }))
        toast.success('You got a new match!')
      })
    } catch (e) {
      console.error(e)
    }
  },

  unsubscribeFromNewMatches: () => {
    try {
      const socket = getSocket()
      socket.off('newMatch')
    } catch (e) {
      console.error(e)
    }
  },
}))

export default useMatchStore
