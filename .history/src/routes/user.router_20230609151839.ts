import { Router } from 'express'

const usersRouter = Router()

usersRouter.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
usersRouter.get('/tweet', (req, res, next) => {
  res.json({
    id: 1,
    message: 'tweet'
  })
})
export default usersRouter
