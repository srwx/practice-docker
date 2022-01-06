const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

router.post("/signup", authController.signup) // Signup

module.exports = router
