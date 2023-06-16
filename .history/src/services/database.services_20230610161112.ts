import { MongoClient } from 'mongodb'
const uri = 'mongodb+srv://admin123:admin123@twitter.1ija8x9.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  client = new MongoClient(uri)

  constructor() {
    this.client
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close()
    }
  }
}
