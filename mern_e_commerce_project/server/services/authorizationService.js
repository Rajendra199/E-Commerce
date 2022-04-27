const jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require('../config/envConfig');

class AuthorizationService{
    authorized(req, res, next){
        const headerToken = req.headers.authorization;
        if(headerToken){
            const token = headerToken.split('Bearer ')[1];
            console.log(token);
            const verified = jwt.verify(token, JWT_TOKEN);
            if(verified){
                next();
            }else{
                return res.status(401).json({errors: [{msg: 'Please add a valid token'}]})
            }
        }else{
            return res.status(401).json({errors: [{msg: 'Please add a token'}]})
        }
    }
}

module.exports = new AuthorizationService();