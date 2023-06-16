import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
console.log(process.env.DB_USERNAME)
const uri = 'mongodb+srv://admin123:admin123@twitter.1ija8x9.mongodb.net/?retryWrites=true&w=majority'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// using class to get used to with next.js
class DatabaseService {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}
// create object from DatabaseService class

const databaseService = new DatabaseService()

export default databaseService
