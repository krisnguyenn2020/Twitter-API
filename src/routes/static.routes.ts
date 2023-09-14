import { Router } from 'express'
import { serveImageController, serverVideoController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', serveImageController)
staticRouter.get('/video/:name', serverVideoController)

export default staticRouter
