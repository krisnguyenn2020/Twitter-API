import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
config()
// pass parameter an object that contains payload, secret, options
// secret and options already have default value
export const signToken = (
  {
    payload,
    secret = process.env.JWT_SECRET as string,
    options = {
      algorithm: 'HS256'
    }
  }: {
    // type of parameter
    payload: string | Buffer | object
    secret?: string
    options?: SignOptions
  } // return a promise that resolves a token
) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })

export const verifyToken = ({ token, secretOrPublicKey = process.env.JWT_SECRET }: {token: string, secretOrPublicKey?: string}) => {}

