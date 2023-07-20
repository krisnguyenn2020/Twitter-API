import { Request } from 'express';
import User from './models/schemas/User.schema';
import { TokenPayload } from './models/requests/User.requests';
// expand Request interface type for user
declare module 'express' {
  interface Request {
    user?: User
    decoded_authorization: TokenPayload
  }
}