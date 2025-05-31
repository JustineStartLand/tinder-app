import { Router } from 'express'

import { protectRoute } from '../middlewares/protect-route.middleware'
import { updateProfile } from '../controllers/users.controller'

const usersRouter = Router()

usersRouter.put('/update', protectRoute, ...updateProfile)
export default usersRouter
