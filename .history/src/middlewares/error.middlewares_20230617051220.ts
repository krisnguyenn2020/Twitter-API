import { NextFunction, Response, Request } from 'express'
import HTTP_STATUS from '~/constants/httpStatus'
import { omit } from 'lodash'

export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('🚀 ~ file: error.middlewares.ts:1 ~ defaultErrorHandler ~ err', err)
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status']))
}
