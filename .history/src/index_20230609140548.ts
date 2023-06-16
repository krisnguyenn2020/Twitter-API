import express from 'express'

const app = express()
const router = express.Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
router.get((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.get('/tweet', (req, res, next) => {
  res.send('My tweet')
  next()
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
