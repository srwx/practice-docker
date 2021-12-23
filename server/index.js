// libs
const express = require("express")
// routes
const postRoute = require("./routes/post")
// port
const PORT = process.env.PORT || 3001

const app = express()

// Middlewares
app.use(express.json()) // Parse JSON in req.body to object. (Used in POST, PUT method for gain req.body)

// API Routes
app.use("/api/post", postRoute)

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}...`)
})