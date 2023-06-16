import express from 'express'
import usersRouter from './routes/users.router'
import { MongoClient, ServerApiVersion } from 'mongodb'

const app = express()
// middleware to parse incoming requests with JSON payloads to object

async function run() {
  try {
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 })
    console.log('Pinged your deployment. You successfully connected to MongoDB!')
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

app.use(express.json())
app.use('/users', usersRouter)
// run server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000')
})
