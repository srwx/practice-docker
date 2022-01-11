const { ObjectId } = require("mongodb") // Function used to convert string to ObjectId or convert ObjectId to string
const dbConnect = require("../libs/dbConnect")

const postPermission = async (req, res, next) => {
  try {
    const { userId } = req.session.user
    const postId = req.params.id
    const postObjId = ObjectId(postId)
    const db = await dbConnect()
    const post = await db.collection("post").findOne({ _id: postObjId })
    if (userId !== post.userId) {
      // This user not the owner this post
      return res.status(403).json({
        success: false,
        message: "You don't have permission for this post",
      })
    } else {
      req.postId = postObjId // Pass ObjectId of this post to next middleware
      next() // Call next middleware
    }
  } catch (err) {
    console.log(err)
    res.status(404).json({ success: false, message: "Post permission error" })
  }
}

module.exports = postPermission
