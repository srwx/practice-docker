// ================================ This controller used for /api/post ================================
const { ObjectId } = require("mongodb") // Function used to convert string to ObjectID
const dbConnect = require("../libs/dbConnect")

// GET method
module.exports.getPost = async (req, res) => {
  try {
    const db = await dbConnect()
    const data = await db.collection("post").findOne({ name: "wong" })
    res.status(200).json({ txt: "GET from post API", data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// POST method
module.exports.createPost = async (req, res) => {
  try {
    const data = req.body
    const db = await dbConnect()
    db.collection("post").insertOne(data)
    res.status(200).json({ txt: "CREATE from post API", data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// PUT method
module.exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id
    const objId = ObjectId(id)
    const newData = req.body
    const db = await dbConnect()
    db.collection("post").findOneAndUpdate({ _id: objId }, { $set: newData })
    res.status(200).json({ txt: `UPDATE from post API, ID: ${id}` })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// DELETE method
module.exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id
    const objId = ObjectId(id)
    const db = await dbConnect()
    db.collection("post").findOneAndDelete({ _id: objId })
    res.status(200).json({ txt: `DELETE from post API, ID: ${id}` })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
