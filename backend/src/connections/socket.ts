import { Server, Socket } from 'socket.io'
import { Server as HttpServer, IncomingMessage, ServerResponse } from 'http'
import config from '../core/config'

let io: Server
const connectedUsers = new Map()

interface ExtendedSocket extends Socket {
  userId?: string
}

export const initializeSocket = (
  httpServer: HttpServer<typeof IncomingMessage, typeof ServerResponse>
) => {
  io = new Server(httpServer, {
    cors: {
      origin: config.CLIENT_URL,
      credentials: true,
    },
  })

  // middleware
  io.use((socket: ExtendedSocket, next) => {
    const userId = socket.handshake.auth.userId
    if (!userId) return next(new Error('Invalid user ID'))

    socket.userId = userId
    next()
  })

  io.on('connection', (socket: ExtendedSocket) => {
    console.log(`User connected with socket id: ${socket.id}`)
    connectedUsers.set(socket.userId, socket.id)

    socket.on('disconnect', () => {
      console.log(`User disconnected with socket id: ${socket.id}`)
      connectedUsers.delete(socket.userId)
    })
  })
}

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized')
  }
  return io
}
export const getConnectedUsers = () => connectedUsers
