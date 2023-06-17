import { Request } from 'express';
import User from './models/schemas/User.schema';
// expand Request interface type for user
declare module 'express' {
  interface Request {
    user: User;

}