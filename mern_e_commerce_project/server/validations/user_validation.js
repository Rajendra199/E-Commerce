const { body } = require('express-validator');

module.exports.registerValidate = [
    body('name').not().isEmpty().trim().escape().withMessage('name is required...!!!'),
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required...!!!'),
    body('password').isLength({min: 5}).trim().withMessage('password should be 5 characters long...!!!!')
]


module.exports.loginValidate = [
    body('email').isEmail().normalizeEmail().trim().withMessage('email is required...!!!'),
    body('password').not().isEmpty().withMessage('password is required...!!!!')
]