import express from 'express'
import usersRouter from './routes/users.router'
import databaseService from './services/database.services'

const app = express()
// test connection to MongoDB from database.services.ts
databaseService.connect
// middleware to parse incoming requests with JSON payloads to object
app.use(express.json())

app.use('/users', usersRouter)
// run server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
