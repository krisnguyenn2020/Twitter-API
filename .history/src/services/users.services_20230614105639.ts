import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
class UsersServices {
  async register(payload: { username: string; email: string; password: string }) {
    const { email, password, username } = payload
    const result = await databaseService.users.insertOne(
      new User({
        email,
        password,
        username
      })
    )
    return result
  }
  async checkEmailExisted(email: string) {
    const user = await databaseService.users.findOne({ email })
    console.log(user)
    return Boolean(user)
  }
}
const userServices = new UsersServices()
export default userServices
