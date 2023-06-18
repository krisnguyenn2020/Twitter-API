import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    // if no error, go to next middleware
    if (errors.isEmpty()) {
      return next()
    }
    const errorObject = errors.mapped()

    const entityError = new EntityError({ errors: {} })

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      // return unvalidate error
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
      entityError.errors[key] = msg
    }

    // console.log("🚀 ~ file: validation.ts:14 ~ return ~ errorObject:", errorObject)

    next(entityError)
    // errors.array() will check single field validation and return array of errors so it be duplicated
    // errors.mapped() will check single field validation and return object of errors so it be unique
    // res.status(422).json({ errors: errors.mapped() })
  }
}
