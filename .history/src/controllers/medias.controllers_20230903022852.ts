import { Request, Response, NextFunction } from 'express'

import { handleUploadSingleImage } from '~/utils/file'
import mediaService from '~/services/medias.services'
import { USERS_MESSAGES } from '~/constants/messages'
import { UPLOAD_DIR } from '~/constants/dir'
import path from 'path'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const ulr = await mediaService.handleUploadSingleImage(req)
  console.log(ulr)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: ulr

  })
}

export const serveImageController = async (req: Request, res: Response, next: NextFunction) => {
  const {name} = req.params
  console.log(name)
  return res.sendFile(pathh.resolve(UPLOAD_DIR, name))
}