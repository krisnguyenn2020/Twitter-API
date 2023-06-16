import { Request, Response } from 'express'
import userServices from '~/services/users.services'

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
export const registerController = async (req: Request, res: Response) => {
  const { username, password, email } = req.body
  try {
    userServices.register({ username, password, email })
    return res.json({
      message: 'Register successful'
    })
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
