import { Request, Response } from 'express'
import databaseService from '~/services/database.services'
import User from '~/models/schemas/User.schema'
export const registerController = async (req: Request, res: Response) => {
  const { username, password, email } = req.body
  try {
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
  } catch (error) {
    return res.status(400).json({
      error: 'Register failed'
    })
  }
}
