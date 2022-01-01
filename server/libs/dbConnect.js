const { MongoClient } = require("mongodb")

// Connection URI
const url = "mongodb://admin:password@localhost:27018"
const client = new MongoClient(url)

// Database name
const dbName = "docker-practice"

async function dbConnect() {
  try {
    await client.connect()
    console.log("Connected to MongoDB.")
    const db = client.db(dbName)
    return db
  } catch (err) {
    console.log(`Cannot connect to db.`)
    console.log(err)
  }
}

module.exports = dbConnect
