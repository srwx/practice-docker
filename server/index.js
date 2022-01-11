// libs
const express = require("express")
const redis = require("redis")
const session = require("express-session")
let RedisStore = require("connect-redis")(session)
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
      maxAge: 1 * 60 * 1000, // cookie age: 1 mins
    },
  })
)

// API Routes
app.use("/api/post", postRoute)
app.use("/api/auth", authRoute)

app.listen(PORT, () => {
  console.log(`listening at PORT ${PORT}...`)
})
