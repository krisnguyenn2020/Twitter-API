import { NextFunction, Request, Response } from 'express'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  // console.log(req.body)
  const { username, password } = req.body
  if (username === 'krisnguyenn2020@gmail.com' && password === '123456') {
    res.json({
      message: 'Login successful'
    })
  } else {
    res.status(400).json({
      error: 'Login failed'
    })
  }
}
// Need to add async/await to the controller
export const registerController =(
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('Error from register controller')
  console.log(userServices.register(req.body))
  const result = userServices.register(req.body)
  return res.json({
    message: 'Register successful',
    result
  })
}
