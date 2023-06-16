import { Router } from 'express'
import { loginValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, (req, res, next) => {
  res.json({
    id: 1,
    message: 'tweet'
  })
})
export default usersRouter
