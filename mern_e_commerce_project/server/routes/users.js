const express = require('express');
const router = express.Router();
const {registerController, loginController} = require('../controllers/user_controllers');
const {registerValidate, loginValidate} = require('../validations/user_validation');

router.post('/register', registerValidate, registerController);
router.post('/login', loginValidate, loginController);

module.exports = router;