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
export interface followReqBody {
  user_id: string
}
export interface LogoutReqBody {
  refresh_token: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface ResetPasswordReqBody {
  forgot_password_token: string
  password: string
  confirm_password: string
}
export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  avatar?: string
  username?: string
  cover_photo?: string
}
