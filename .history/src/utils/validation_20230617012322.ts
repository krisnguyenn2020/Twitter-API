import express from 'express'
import { validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/HTTP_STATUS'
import { ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req)

    const errors = validationResult(req)
    const errorObject = errors.mapped()

    for (const key in errorObject) {
      const { msg } = errorObject[key]
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        return next(msg)
      }
    }

    console.log("🚀 ~ file: validation.ts:14 ~ return ~ errorObject:", errorObject)
    if (errors.isEmpty()) {
      return next()
    }
    // errors.array() will check single field validation and return array of errors so it be duplicated
    // errors.mapped() will check single field validation and return object of errors so it be unique
    // res.status(422).json({ errors: errors.mapped() })
  }
}
