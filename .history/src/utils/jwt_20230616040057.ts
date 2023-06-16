import jwt from 'jsonwebtoken'

const signToken = (payload: any, secret: string, options: jwt.SignOptions) => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        throw reject(err)
      }
      resolve(token as string)
    })
  })
}