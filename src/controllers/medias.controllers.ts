import { Request, Response, NextFunction } from 'express'
import path from 'path'
console.log(path.resolve('uploads'))
export const uploadSingleImageController = async (req: Request, res: Response, next: NextFunction) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 // 300kb
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    }
    res.json({
      message: 'Upload single image successfully',
    })
  })
}