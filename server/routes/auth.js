const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

router.post("/signup", authController.signup) // Signup
router.post("/signin", authController.signin) // Signin

module.exports = router
