import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import type { TMessage } from '../types/Message.types'
import { getSocket } from '../connections/socket'
import useAuthStore from './useAuthStore'
import { v7 as uuidv7 } from 'uuid'
type TMessageStoreState = {
  isFetchingMessages: boolean
  messages: TMessage[]
  sendMessage: (receiverId: string, content: string) => Promise<void>
  getMessages: (userId: string) => Promise<void>
  subscribeToMessages: () => void
  unsubscribeFromMessages: () => void
}

const useMessageStore = create<TMessageStoreState>((set) => ({
  isFetchingMessages: false,
  messages: [],
  sendMessage: async (receiverId, content) => {
    const authUser = useAuthStore.getState().authUser
    const newMessage: TMessage = {
      id: uuidv7(),
      content,
      senderId: authUser!.id,
      receiverId,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }
    set((state) => ({
      messages: [...state.messages, newMessage],
    }))
    try {
      const res = await axiosInstance.post('/messages/send', {
        receiverId,
        content,
      })
    } catch (e) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while sending your message'
      )
    }
  },

  getMessages: async (userId) => {
    try {
      const res = await axiosInstance.get(`/messages/conversation/${userId}`)
      set({ messages: res.data.data })
      set({ isFetchingMessages: true })
    } catch (e) {
      toast.error(
        (e instanceof AxiosError && e.response?.data.message) ||
          'Something went wrong while fetching messages'
      )
      set({ messages: [] })
    } finally {
      set({ isFetchingMessages: false })
    }
  },

  subscribeToMessages: () => {
    try {
      const socket = getSocket()
      socket.on('newMessage', ({ message }: { message: TMessage }) => {
        set((state) => ({
          messages: [...state.messages, message],
        }))
      })
    } catch (e) {
      console.error(e instanceof Error && e.message)
    }
  },

  unsubscribeFromMessages: () => {
    try {
      const socket = getSocket()
      socket.off('newMessage')
    } catch (e) {
      console.error(e instanceof Error && e.message)
    }
  },
}))

export default useMessageStore
