import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
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
  const result = await databaseService.users.insertOne(
    new User({
      username,
      email,
      password
    })
  )
  return res.json({
    message: 'Register successful'
  })
}
