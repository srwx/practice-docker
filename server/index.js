const { MongoClient } = require("mongodb")
require("dotenv").config()

// Connection URI
const url = process.env.DB_URI
const client = new MongoClient(url)

// Database name
const dbName = process.env.DB_NAME

async function dbConnect() {
  try {
    await client.connect()
    console.log("Connect to MongoDB success.")
    const db = client.db(dbName)
    const data = await db.collection("post").findOne({ name: "wong" })
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

dbConnect()
