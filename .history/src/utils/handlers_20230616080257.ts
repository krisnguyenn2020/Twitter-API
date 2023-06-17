// Note: Handlers for async functions
import { Response, Request, NextFunction, RequestHandler } from 'express'
export const wrapAsync = (func: RequestHandler) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    // short version
    Promise.resolve(func(req, res, next)).catch(next)
    // try {
    //   await func(req, res, next)
    // } catch (error) {
    //   next(error)
    // }
  }
}