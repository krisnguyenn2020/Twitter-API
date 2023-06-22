import { RegisterReqBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '../utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import { ObjectId } from 'mongodb'
import { config } from 'dotenv'
import { USERS_MESSAGES } from '~/constants/messages'
// Class style
config()
class UsersServices {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }
  private signEmailVerifyToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }
  private signAccessAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }

  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken(user_id.toString())
    await databaseService.users.insertOne(
      // This object User only contains the fields that we want to insert into the database
      new User({
        _id: user_id,
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        // Hash password using SHA-256
        password: hashPassword(payload.password)
      })
    )
    // Sign access token and refresh token after register successfully asynchorously
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id.toString())
    // Insert refresh token into database
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    )
    return [
      {
        access_token,
        refresh_token
      }
    ]
  }
  async checkEmailExisted(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }

  async login(user_id: string) {
    // Access token was not stored in database because it is stateless
    // Return access token to client so that client can store it in cookie or local storage
    const [access_token, refresh_token] = await this.signAccessAndRefreshToken(user_id)
    await databaseService.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    )
    return { access_token, refresh_token }
  }
  async logout(refresh_token: string) {
    // Delete refresh token from database
    await databaseService.refreshToken.deleteOne({ token: refresh_token })
    return {
      message: USERS_MESSAGES.LOGOUT_SUCCESS
    }
  }
  async verifyEmail(user_id: string) {
    await databaseService.users.updateOne(
      { _id: new ObjectId(user_id) },
      {
        $set: {
          email_verify_token: '',
          updated_at: new Date()

        }
      })
  }
}
const userServices = new UsersServices()
export default userServices
