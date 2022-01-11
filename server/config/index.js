module.exports = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_IP: process.env.MONGO_IP || "mongodb", // In docker compose, can use service name (mongodb) instead of real IP address
  MONGO_PORT: process.env.MONGO_PORT || "27017",
  REDIS_URL: process.env.REDIS_URL || "redis", // In docker compose, can use service name (redis) instead of real IP address
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_SESSION_SECRET: process.env.REDIS_SESSION_SECRET,
}
