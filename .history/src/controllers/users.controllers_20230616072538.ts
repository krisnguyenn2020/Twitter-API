import { NextFunction, Request, Response } from 'express'
import userServices from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  console.log(req.body)
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
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    throw new Error('Test error')
    const result = await userServices.register(req.body)
    return res.json({
      message: 'Register successful',
      result
    })
  } catch (error) {
    next(error)
  }
}
