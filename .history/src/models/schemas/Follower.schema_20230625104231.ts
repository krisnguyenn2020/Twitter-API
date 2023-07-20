import { ObjectId } from "mongodb"

interface FollowerType {
  _id?: ObjectId
  user_id: ObjectId
  created_at?: Date
  followed_user_id: ObjectId
}
export default class Follower {
  _id?: ObjectId
  user_id: ObjectId
  created_at?: Date
  followed_user_id: ObjectId
  constructor({ _id, token, created_at, user_id }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at || new Date()
    this.user_id = user_id
  }
}