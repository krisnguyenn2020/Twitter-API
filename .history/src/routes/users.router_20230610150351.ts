import { Router } from 'express'
import { loginValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, (req, res, next) => {
  message: 'Login successful'
})
export default usersRouter
