import databaseService from './database.services'
import User from '~/models/schemas/User.schema'
class UsersServices {
  async register(payload: { email: string; password: string }) {
    const result = databaseService.users.insertOne(new User({ email, password }))
    // ...
  }
}
