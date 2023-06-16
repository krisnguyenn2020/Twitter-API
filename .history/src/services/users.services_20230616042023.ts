import { RegisterReqBody } from '~/models/requests/User.requests'
import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '../utils/crypto';
import { signToken } from '~/utils/jwt';
import { TokenType } from '~/constants/enums';
// Class style


class UsersServices {

  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      }
    })
  }
  async register(payload: RegisterReqBody) {

    const result = await databaseService.users.insertOne(
      // This object User only contains the fields that we want to insert into the database
      new User({
        ...payload,
        date_of_birth: new Date(payload.date_of_birth),
        // Hash password using SHA-256
        password: hashPassword(payload.password)
      })
    )
    // Sign access token and refresh token after register successfully asynchorously
    const user_id = result.insertedId.toString()
    const [access_token, refresh_token] = await Promise.all([
      this.signAccessToken(user_id),
      this.signRefreshToken(user_id)
    ])
     // Promise.all() to run multiple promises at the same time
    return {
      access_token,
      refresh_token
    }
  }
  async checkEmailExisted(email: string) {
    const user = await databaseService.users.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}
const userServices = new UsersServices()
export default userServices

// functional style
// async function register(payload: { username: string; email: string; password: string }) {
//   const { email, password, username } = payload
//   const result = await databaseService.users.insertOne(
//     new User({
//       email,
//       password,
//       username
//     })
//   )
//   return result
// }

// async function checkEmailExisted(email: string) {
//   const user = await databaseService.users.findOne({ email })
//   return Boolean(user)
// }

// export default {
//   register,
//   checkEmailExisted
// }