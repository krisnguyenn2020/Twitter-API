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
usersRouter.post('/register', registerValidator,
   (req, res, next) => {
    console.log("request handler 1")
    next()
  },
  (req, res, next) => {
    console.log("request handler 2")
    next()
  }, (req, res) => {
    console.log("request handler 3")
    res.json({ message: "Register successful" })
  }
)
export default usersRouter
