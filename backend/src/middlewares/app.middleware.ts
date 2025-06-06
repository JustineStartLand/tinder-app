import express from 'express'
import cors from 'cors'
import { Express } from 'express'
// import path from "path";
import cookieParser from 'cookie-parser'
import config from '../core/config'
export const applyAppMiddlewares = (app: Express) => {
  //   const __dirname = path.resolve();
  app.use(express.json({ limit: '5mb' }))
  app.use(express.urlencoded({ extended: true, limit: '5mb' }))
  app.use(
    cors({
      origin: [config.CLIENT_URL],
      methods: ['PUT', 'GET', 'POST', 'DELETE'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  app.use(cookieParser())
  app.use((req, res, next) => {
    console.log(`Method: ${req.method}`)
    console.log(`Params: ${req.params}`)
    console.log(`Url: ${req.originalUrl}`)
    next()
  })
}
