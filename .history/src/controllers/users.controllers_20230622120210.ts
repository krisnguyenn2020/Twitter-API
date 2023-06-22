import { NextFunction, Request, Response } from 'express'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { LogoutReqBody, RegisterReqBody, TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { USERS_MESSAGES } from '~/constants/messages'
import databaseService from '~/services/database.services'

export const loginController = async (req: Request, res: Response) => {
  const user = req.user as User
  // console.log("🚀 ~ file: users.controllers.ts:8 ~ loginController ~ user:", user)
  const user_id = user._id as ObjectId
  // console.log("🚀 ~ file: users.controllers.ts:10 ~ loginController ~ user_id:", _id)
  const result = await userServices.login(user_id.toString())
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
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
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body

  const result = await userServices.logout(refresh_token)
  return res.json({
    message: USERS_MESSAGES.LOGOUT_SUCCESS
  })
}
export const emailVerifyValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { user_id } = req.decoded_email_verify_token as TokenPayload
  const user = await databaseService.users.findOne({ 
    _id: new ObjectId(user_id),
   })
}