import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, refreshTokenValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/**
 * Description: Login user
 * path: /login
 * method: POST
 * body: {email: string, password: string}
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description: Register new user
 * path: /register
 * method: POST
 * body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 *
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
/**
 * Description: Logout user
 * path: /logout
 * method: POST
 * headers: {Authorization: Bearer <access_token>}
 * body: {refresh_token: string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, (req, res) => {
  res.json({ message: 'Logout successfully' })
})
export default usersRouter
