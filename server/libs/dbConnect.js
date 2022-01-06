// Use db in container
//   1. docker exec -it [MONGO_CONTAINER] bash
//   2. mongo -u "admin" -p "password"
const { MongoClient } = require("mongodb")

// Connection URI
const url = process.env.DB_URI
const client = new MongoClient(url)

// Database name
const dbName = process.env.DB_NAME

async function dbConnect() {
  try {
    await client.connect()
    console.log("Connected to MongoDB.")
    const db = client.db(dbName)
    return db
  } catch (err) {
    console.log(err)
    setTimeout(dbConnect, 3000) // Run this function again after 3 sec. (If node container started but mongo not ready, then try to connect to db again.)
  }
}

module.exports = dbConnect
