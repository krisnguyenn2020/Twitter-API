import jwt, { SignOptions } from 'jsonwebtoken'

// pass parameter an object that contains payload, secret, options
// secret and options already have default value
export const signToken = ({
  payload,
  secret = process.env.JWT_SECRET as string,
  options = {
    algorithm: 'HS256',
    expiresIn: '15 minutes'
  }
}: {
  payload: string | Buffer | object
  secret?: string
  options: SignOptions
}) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
