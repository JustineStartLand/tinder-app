import { Router } from 'express'
import {
  displayLoggedInUser,
  login,
  logout,
  signup,
} from '../controllers/auth.controller'
import { protectRoute } from '../middlewares/protect-route.middleware'

const authRouter = Router()

authRouter.post('/login', ...login)
authRouter.post('/signup', ...signup)
authRouter.post('/logout', logout)
authRouter.get('/me', protectRoute, displayLoggedInUser)
export default authRouter
