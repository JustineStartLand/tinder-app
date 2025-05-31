import { Router } from 'express'
import authRouter from './auth.route'
import usersRouter from './users.route'
import matchesRouter from './matches.route'
import messagesRouter from './messages.route'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/matches', matchesRouter)
apiRouter.use('/messages', messagesRouter)
export default apiRouter
