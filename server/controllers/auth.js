const dbConnect = require("../libs/dbConnect")
const { ObjectId } = require("mongodb")
const bcrypt = require("bcryptjs")

// Signup
module.exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 12)
    const db = await dbConnect()
    const user = await db
      .collection("user")
      .insertOne({ username, password: hashedPassword })
    res
      .status(201)
      .json({ success: true, userId: ObjectId(user.insertedId).toString() })
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false })
  }
}

// Signin
module.exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body
    const db = await dbConnect()
    const user = await db.collection("user").findOne({ username })
    if (!user) {
      // This username not found in db
      res
        .status(404)
        .json({ success: false, message: "This username not found" })
    }

    // Decode password
    const checkPassword = await bcrypt.compare(password, user.password)
    if (checkPassword) {
      res
        .status(200)
        .json({ success: true, userId: ObjectId(user.insertedId).toString() })
    } else {
      res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      })
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false })
  }
}
