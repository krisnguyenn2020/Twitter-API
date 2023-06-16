import { Collection, Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
import User from "~/models/schemas/User.schema";
dotenv.config();
// console.log(process.env.DB_USERNAME);
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@twitter.1ija8x9.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

// using class to get used to with next.js
class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    catch (error) {
      console.log("Error trying to connect to MongoDB");
      console.log(error);
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

// create object from DatabaseService class

const databaseService = new DatabaseService()

export default databaseService;

