import { NextFunction, Request, Response } from 'express'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const user = { req }
  const {user_id} = user
  userServices.login(user_id)
}
// Need to add async/await to the controller
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('Error from register controller')
  // console.log(userServices.register(req.body))
  const result = await userServices.register(req.body)
  console.log('🚀 ~ file: users.controllers.ts:28 ~ result:', result)
  return res.json({
    message: 'Register successful',
    result
  })
}
