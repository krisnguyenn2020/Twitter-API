import { NextFunction } from "express";

 export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log('Error!!', err.message)

}
