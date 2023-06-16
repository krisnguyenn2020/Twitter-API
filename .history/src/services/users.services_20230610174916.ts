import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
class UsersServices {
  async register(payload: { username: string; email: string; password: string }) {
    const { email, password, username } = payload
    const result = databaseService.users.insertOne(
      new User({
        email,
        password,
        username
      })
    )
    return result
  }
}
const userServices = new UsersServices()
export default userServices
