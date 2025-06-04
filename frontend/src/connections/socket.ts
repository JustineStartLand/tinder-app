import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

const SOCKET_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/'

let socket: Socket | null = null

export const initializeSocket = (userId: string) => {
  if (socket) {
    socket.disconnect()
  }

  socket = io(SOCKET_URL, {
    auth: {
      userId: userId,
    },
  })

  socket.on('connect', () => {
    console.log('Connected to server:', socket?.id)
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from server')
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized')
  }
  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
