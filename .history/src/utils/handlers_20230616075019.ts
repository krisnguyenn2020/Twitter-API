// Note: Handlers for async functions
import { Response, Request, NextFunction } from 'express'
export const wrapAsync = (func: any) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await func(req, res, next).catch(next)
    } catch (error) {
      next(error)
    }
  }
}
