/* eslint-disable prettier/prettier */
import { Router } from 'express'
const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
/**
 * Description: Register new user
 * path: /register
 * method: POST
 * body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 *
 */
usersRouter.post(
  '/register',
  registerValidator,
  
  (req, res, next) => {
    console.log('request handler 1')
    next()
  },
  (req, res, next) => {
    console.log('request handler 2')
  }
)
export default usersRouter
