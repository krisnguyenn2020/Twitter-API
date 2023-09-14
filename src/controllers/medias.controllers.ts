import { Request, Response, NextFunction } from 'express'

import { handleUploadImage } from '~/utils/file'
import mediaService from '~/services/medias.services'
import { USERS_MESSAGES } from '~/constants/messages'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import path from 'path'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaService.uploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}
export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaService.uploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

// This method is used to serve image from server (more customizable)
export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  console.log(name)
  // return res.send("hello")
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}
export const serverVideoController = (req: Request, res: Response, next: NextFunction) => {
  const {name } = req.params
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}