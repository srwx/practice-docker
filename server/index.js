// libs
const express = require("express")
const redis = require("redis")
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
const cors = require("cors")
// config
const { REDIS_URL, REDIS_PORT, REDIS_SESSION_SECRET } = require("./config")
// routes
const postRoute = require("./routes/post")
const authRoute = require("./routes/auth")
// port
const PORT = process.env.PORT || 3001 // This port is container port too. (if run docker command -p this container port is 3001)

const app = express()

// Middleware
app.use(express.json()) // Parse JSON in req.body to object. (Used in POST, PUT method for gain req.body)

// Session
let redisClient = redis.createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
  legacyMode: true,
})
const redisConnect = async () => {
  await redisClient.connect()
}
redisConnect()
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: REDIS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 5 * 60 * 1000, // cookie age: 5 mins
    },
  })
)

app.enable("trust proxy") // Enable app to use nginx custom config (Get real client IP)
app.use(cors()) // Enable cors (other domains (e.g. front-end) able to send request to this api app)

// API Routes
app.use("/api/post", postRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}...`)
})
