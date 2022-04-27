require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    JWT_TOKEN: process.env.JWT_TOKEN
}