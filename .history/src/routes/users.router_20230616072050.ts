import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
/**
 * Description: Register new user
 * path: /register
 * method: POST
 * body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 *
 */
usersRouter.post('/register', registerValidator, registerController, (err, req, res, next) => { 
  console.log("Error!!", err.message)
}


)
export default usersRouter
