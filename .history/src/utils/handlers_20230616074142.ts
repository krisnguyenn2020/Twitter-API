import { NextFunction } from "express";

export const wrapAsync = (func: any) => {
  return function (req: Rany, res: any, next: any) {
    func(req, res, next).catch(next);
  };
}