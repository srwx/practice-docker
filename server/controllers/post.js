// ================================ This controller used for /api/post ================================
const { ObjectId } = require("mongodb") // Function used to convert string to ObjectID
const dbConnect = require("../libs/dbConnect")

// GET method (Get all posts)
module.exports.getAllPosts = async (req, res) => {
  try {
    const db = await dbConnect()
    const data = await db.collection("post").find({}).toArray()
    res.status(200).json({ success: true, data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// GET method (Get post with specific id)
module.exports.getPost = async (req, res) => {
  try {
    const id = req.params.id
    const objId = ObjectId(id)
    const db = await dbConnect()
    const data = await db.collection("post").findOne({ _id: objId })
    res.status(200).json({ success: true, data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// POST method
module.exports.createPost = async (req, res) => {
  try {
    const post = req.body
    const { userId, username } = req.session.user
    const data = {
      userId,
      username,
      title: post.title,
      content: post.content,
    }
    const db = await dbConnect()
    db.collection("post").insertOne(data)
    res.status(200).json({ success: true, data })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// PUT method
module.exports.updatePost = async (req, res) => {
  try {
    const postObjId = req.postId
    const newData = req.body
    const db = await dbConnect()
    await db
      .collection("post")
      .findOneAndUpdate(
        { _id: postObjId },
        { $set: { title: newData.title, content: newData.content } }
      )
    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}

// DELETE method
module.exports.deletePost = async (req, res) => {
  try {
    const postObjId = req.postId
    const db = await dbConnect()
    db.collection("post").findOneAndDelete({ _id: postObjId })
    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false })
  }
}
