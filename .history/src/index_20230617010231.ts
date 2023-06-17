import express, { Response, Request, NextFunction } from 'express'
import usersRouter from './routes/users.router'
import databaseService from './services/database.services'
import HTTP_STATUS from './constants/HTTP_STATUS'

const app = express()
// test connection to MongoDB from database.services.ts
databaseService.connect()

// middleware to parse incoming requests with JSON payloads to object
app.use(express.json())

app.use('/users', usersRouter)
app.use()
// Default error handler
app.use(defaultErrorHandler)

// run server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})