import { NextFunction, Response , Request } from "express";
import HTTP_STATUS from "~/constants/HTTP_STATUS";
import {omit} from 'lodash'

 export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, 'status'))
}
