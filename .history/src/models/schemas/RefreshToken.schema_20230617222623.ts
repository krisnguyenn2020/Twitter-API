import { ObjectId } from "mongodb"

export const RefreshTokenType = {
  _id: { type: ObjectId, required: true },
  token: { type: String, required: true },
  created_at: { type: Date, required: true },
  user_id: { type: ObjectId, required: true }
}
export default class RefreshToken {
  _id: ObjectId
  token: string
  created_at: Date
  user_id: ObjectId
  constructor({ _id, token, created_at, user_id }: RefreshTokenType) {
    this._id = _id
    this.token = token
    this.created_at = created_at
    this.user_id = user_id
  }
}