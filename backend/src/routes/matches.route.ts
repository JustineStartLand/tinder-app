import { Router } from 'express'
import { protectRoute } from '../middlewares/protect-route.middleware'
import {
  displayMatches,
  displayUserProfiles,
  swipeLeft,
  swipeRight,
} from '../controllers/matches.controller'

const matchesRouter = Router()

matchesRouter.use(protectRoute)
matchesRouter.post('/swipe-right/:likedUserId', swipeRight)
matchesRouter.post('/swipe-left/:dislikedUserId', swipeLeft)
matchesRouter.get('/', displayMatches)
matchesRouter.get('/user-profiles', displayUserProfiles)
export default matchesRouter
