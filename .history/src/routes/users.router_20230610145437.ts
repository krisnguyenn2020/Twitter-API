import { Router } from 'express'

const usersRouter = Router()

usersRouter.post('/login', (req, res, next) => {
  res.json({
    id: 1,
    message: 'tweet'
  })
})
export default usersRouter
