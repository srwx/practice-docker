const express = require("express")
const router = express.Router()
const postController = require("../controllers/post")
const checkAuth = require("../middlewares/auth")

router.get("/", postController.getAllPosts) // Get all posts
router.get("/:id", postController.getPost) // Get single post
router.post("/", checkAuth, postController.createPost) // Create post (Call checkAuth middleware first to check is user logged-in?, if not, return error)
router.put("/:id", checkAuth, postController.updatePost) // Update post
router.delete("/:id", checkAuth, postController.deletePost) // Delete post

module.exports = router
