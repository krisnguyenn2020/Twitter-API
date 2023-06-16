import express from 'express'

const app = express()
const router = express.Router()

app.get('/', (req, res) => {
  res.send('Hello World!')
})
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
router.use('/tweet', (req, res, next) => {
  res.send('My tweet')
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
