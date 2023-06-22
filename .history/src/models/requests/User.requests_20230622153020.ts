// declare interface
import { JwtPayload } from 'jsonwebtoken';
import { TokenType } from '~/constants/enums';

export interface LoginReqBody {
  email: string
  password: string
}
export interface VerifyEmailReqBody {
  email_verify_token: string
}
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}
export interface TokenPayload extends JwtPayload {
  _id: string
  token_type: TokenType
}
export interface LogoutReqBody {
  refresh_token: string
}