import express from 'express'
import usersRouter from './routes/user.router'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', usersRouter)
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
