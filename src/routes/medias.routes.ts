import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '../utils/handlers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'

const mediasRouter = Router()
mediasRouter.post('/upload-image', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadImageController))
mediasRouter.post('/upload-video', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadVideoController))

export default mediasRouter
