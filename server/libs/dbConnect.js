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
    console.log(`Cannot connect to db.`)
    console.log(err)
  }
}

module.exports = dbConnect
