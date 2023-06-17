import { NextFunction } from "express";

export const wrapAsync = (func: any) => {
  return async function (req: any, res: any, next: any) {
    try {
      await func(req, res, next).catch(next);
    } catch (error) {
      next(error);
    }
  }
};