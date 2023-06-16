import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
// Class style
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
