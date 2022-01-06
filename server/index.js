// libs
const express = require("express")
// routes
const postRoute = require("./routes/post")
const authRoute = require("./routes/auth")
// port
const PORT = process.env.PORT || 3001 // This port is container port too. (if run docker command -p this container port is 3001)

const app = express()

// Middlewares
app.use(express.json()) // Parse JSON in req.body to object. (Used in POST, PUT method for gain req.body)

// API Routes
app.use("/api/post", postRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}...`)
})
