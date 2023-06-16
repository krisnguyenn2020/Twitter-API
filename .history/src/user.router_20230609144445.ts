import express from 'express'
import { Router } from 'express'

const userRouter = Router()

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.get('/tweet', (req, res, next) => {
  res.json({
    id: 1,
    message: 'tweet'
  })
})
export default router
