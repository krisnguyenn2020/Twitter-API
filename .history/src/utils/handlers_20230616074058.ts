import { NextFunction } from "express";

export const wrapAsync = (func: any) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch(next);
  };
}