// declare interface
import { JwtPayload } from 'jsonwebtoken';
import { TokenType } from '~/constants/enums';

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
