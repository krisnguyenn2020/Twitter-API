import { NextFunction } from "express";

const export defaultErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
