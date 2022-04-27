const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/envConfig');

module.exports.authService = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

module.exports.jwtToken = (user) => {
    return jwt.sign(user, JWT_TOKEN, {expiresIn: '7d'});
}

module.exports.comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
}