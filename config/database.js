
module.exports = {
  username: process.env.DB_SERVER_USERNAME,
  password: process.env.DB_SERVER_PASSWORD,
  host: process.env.DB_HOST,
  name: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433
}
