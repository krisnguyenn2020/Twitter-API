import express from 'express'
import usersRouter from './routes/users.router'
const app = express()
// middleware to parse incoming requests with JSON payloads
app.use(express.json())
app.use('/users', usersRouter)
// run server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
