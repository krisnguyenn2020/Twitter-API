import fs from 'fs'
import path from 'path'
import { Request } from 'express'
import { File } from 'formidable'
import { UPLOAD_IMAGE_DIR, UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import { get } from 'axios'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR , UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true // create parent folder if not exist ( nested folder)
    })
  }
  })
}

export const handleUploadImage = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFileSize: 1100 * 1024, // 4mb
    maxTotalFileSize: 4 * 1024 * 1024, // 4mb
    filter: function ({ name, originalFilename, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(112)
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.image)) {
        return reject(new Error('File is not found'))
      }
      resolve(files.image as File[])
    })
  })
}
export const handleUploadVideo = async (req: Request) => {
  const formidable = (await import('formidable')).default
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_DIR,
    maxFiles: 1,
    maxFileSize: 1000*1024 * 1024, // 1gb
    filter: function ({ name, originalFilename, mimetype }) {
      return true
      // const valid = name === 'image' && Boolean(mimetype?.includes('image'))
      // if (!valid) {
      //   form.emit('error' as any, new Error('File type is not valid') as any)
      // }
      // return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.log(112)
        return reject(err)
      }
      // eslint-disable-next-line no-extra-boolean-cast
      if (!Boolean(files.video)) {
        return reject(new Error('File is not found'))
      }
      const videos = files.video as File[]
      videos.forEach((video) => {
        fs.renameSync(video.filepath, video.filepath + '.' + getExtension(video.originalFilename as string))
        video.newFilename = video.newFilename + '.' + getExtension(video.originalFilename as string)
      })
      resolve(files.video as File[])
    })
  })
}
export const getNameFromFullName = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
export const getExtension = (fullname: string) => {
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
}