import { Request, Response, NextFunction } from "express"; // type for req, res, next
import { checkSchema } from "express-validator"; // type for checkSchema
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Invalid username or password");
  } else {
    next();
  }
};

interface RegisterBody {
  username: string;
}
export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    isLength: { options: { min: 1, max: 100 } },

  })
