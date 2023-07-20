// Note: Handlers for async functions
import { Response, Request, NextFunction, RequestHandler } from 'express'

export const wrapRequestHandler = (func: RequestHandler) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    // short version but only works with Async/Await
    // Promise.resolve(func(req, res, next)).catch(next)
    try {
      func(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
