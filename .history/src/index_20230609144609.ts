import express from 'express'
import userRouter from './user.router'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRouter)
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
