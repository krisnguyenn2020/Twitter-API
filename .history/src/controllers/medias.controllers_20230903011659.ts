import { Request, Response, NextFunction } from 'express'

import { handleUploadSingleImage } from '~/utils/file'
import mediaService from '~/services/medias.services'

export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await mediaService.handleUploadSingleImage(req)
  console.log(result)
  return res.json({
    result: result
  })
}
