import { Request, Response } from 'express'
import userServices from '~/services/users.services'
import {ParamsDictionary} from 'express-serve-static-core'

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
export const registerController = async (req: <P = core.ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = qs.ParsedQs, Locals extends Record<string, any>, res: Response) => {
  const { username, password, email } = req.body
  try {
    const result = await userServices.register({ username, password, email })
    return res.json({
      message: 'Register successful',
      result
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
