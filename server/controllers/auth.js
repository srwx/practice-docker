const dbConnect = require("../libs/dbConnect")

// Signup
module.exports.signup = async (req, res) => {
  try {
    const data = req.body
    const db = await dbConnect()
    const user = await db.collection("user").insertOne(data)
    res.status(200).json({ success: true, userId: user._id })
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false })
  }
}
