import { NextFunction } from "express";
import HTTP_STATUS from "~/constants/HTTP_STATUS";

 export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error!!', err.message)
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(err)
}
