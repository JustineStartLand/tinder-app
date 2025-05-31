import { Router } from 'express'
import { protectRoute } from '../middlewares/protect-route.middleware'
import {
  displayConversation,
  sendMessage,
} from '../controllers/messages.controller'

const messagesRouter = Router()

messagesRouter.use(protectRoute)
messagesRouter.post('/send', sendMessage)
messagesRouter.get('/conversation/:userId', displayConversation)

export default messagesRouter
