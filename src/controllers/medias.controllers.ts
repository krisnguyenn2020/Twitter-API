import { Request, Response, NextFunction } from 'express'

import { handleUploadSingleImage } from '~/utils/file'
import mediaService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await mediaService.handleUploadSingleImage(req)
  return res.json({
    result: data
  })
}
