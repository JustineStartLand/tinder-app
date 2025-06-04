import { applyAppMiddlewares } from './middlewares/app.middleware'
import config from './core/config'
import apiRouter from './routes/api.route'
import { connectDb } from './db/db'
// import { connectDb } from "./db/db";
import { appErrorHandler } from './middlewares/app-error-handler.middleware'
import express from 'express'
import { createServer } from 'http'
import { initializeSocket } from './connections/socket'
import path from 'path'

const initApp = () => {
  const __dirname = path.resolve()
  const app = express()

  const httpServer = createServer(app)
  applyAppMiddlewares(app)
  const PORT = config.PORT
  initializeSocket(httpServer)
  app.use('/api', apiRouter)
  console.log(`Dirname: ${__dirname}`)

  if (config.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')))
    app.get('/*splat', (req, res) => {
      res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
    })
  }
  app.use(appErrorHandler)

  httpServer.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT}`)
    connectDb()
  })
}

initApp()
