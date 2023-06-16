import { Request, Response, NextFunction } from "express"; // type for req, res, next
import { checkSchema } from "express-validator"; // type for checkSchema
import databaseService from "~/services/database.services";
import { validate } from "~/utils/validation";
export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send("Invalid username or password");
  } else {
    next();
  }
};

export const registerValidator = validate(checkSchema({
  name: {
    notEmpty: true,
    trim: true,
    isLength: { options: { min: 1, max: 100 } },
    isString: true,
  },
  email: {
    notEmpty: true,
    trim: true,
    isEmail: true,
    custom: {
      options: async (value, { req }) => {
        const user = await databaseService.users.findOne({ email: value });
        if (user) {
          throw new Error("Email already in use");
        } else {
          return true;
        }
      }
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
        minSymbols: 1,
      },
    },
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
        minSymbols: 1,
      },
    },
    // check if confirm_password matches password
    custom: {

      // {req} is the express request object
      options: (value, { req }) => {
        console.log(value, req.body.password);
        if (value !== req.body.password) {
          throw new Error("Password confirmation does not match password");
        } else {
          return true;
        }
      },
    }
  },
  date_of_birth: {
    notEmpty: true,
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true
      }
    },
    errorMessage: "Date of birth must be ISO8601 format"
  },
}));

