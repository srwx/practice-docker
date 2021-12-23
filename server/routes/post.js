const express = require("express")
const router = express.Router()
const postController = require("../controllers/post")

router.get("/", postController.getPost)
router.post("/", postController.createPost)
router.put("/:id", postController.updatePost)
router.delete("/:id", postController.deletePost)

module.exports = router
