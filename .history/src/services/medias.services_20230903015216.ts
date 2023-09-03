import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { handleUploadSingleImage } from '~/utils/file'
import { getNameFromFullName } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/utils/config'

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file = await handleUploadSingleImage(req)
    const newName = getNameFromFullName(file.newFilename)
    const newPath = `${UPLOAD_DIR}/${newName}.jpg`
    await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath)
    return isProduction ? `${process.env.HOST}/medias/${newName}.jpg` : `http://localhost:4000/medias/${newName}.jpg
  }
}

const mediaService = new MediasService()

export default mediaService
