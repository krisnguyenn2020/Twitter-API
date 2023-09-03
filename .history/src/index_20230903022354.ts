import express, { Response, Request, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_DIR } from './constants/dir'
import staticRouter from './routes/statoc.routes'

config()


// create folder uploads
initFolder()

databaseService.connect()
const app = express()
const port = process.env.PORT || 4000
// test connection to MongoDB from database.services.ts

// middleware to parse incoming requests with JSON payloads to object
app.use(express.json())

app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
// app.use('/static', express.static(UPLOAD_DIR))

// Default error handler
app.use(defaultErrorHandler)

// run server on port 4000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

