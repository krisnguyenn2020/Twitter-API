import express from 'express'
import router from './user.router'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/', router)
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
