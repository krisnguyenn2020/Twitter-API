import { Request, Response, NextFunction } from 'express' // type for req, res, next
import { checkSchema } from 'express-validator' // type for checkSchema
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send('Invalid username or password')
  } else {
    next()
  }
}

export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    isLength: { options: { min: 1, max: 100 } },
    isString: true
  },
  email: {
    notEmpty: true,
    trim: true,
    isEmail: true
  },
  password: {
    notEmpty: true,
    isString: true,
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  },
  confirm_password: {
    notEmpty: true,
    isString: true,
    isStrongPassword: {
      options: {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      }
    }
  },
  date_of_birth: {
    notEmpty: true,
    isISO8601: true
  }
})
