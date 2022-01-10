module.exports = {
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_IP: process.env.MONGO_IP || "mongodb", // In docker compose, can use service name instead real IP address
  MONGO_PORT: process.env.MONGO_PORT || "27017",
}
