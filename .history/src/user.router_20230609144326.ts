import { express } from 'express'
import { Router } from 'express'

const router = Router()

router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

export default router
