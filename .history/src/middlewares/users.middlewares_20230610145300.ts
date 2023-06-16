export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).send('Invalid username or password')
  } else {
    next()
  }
}
