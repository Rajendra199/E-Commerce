const { validationResult } = require('express-validator');
const User = require('../models/User');
const {authService, jwtToken, comparePassword} = require('../services/authService');

module.exports.registerController = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const {name, email, password} = req.body;
        try{
            const emailExist = await User.findOne({email});
            if(!emailExist){
                const hashed = await authService(password);
                const user = await User.create({
                    name,
                    email,
                    password: hashed
                });
                const token = jwtToken({id: user._id, name: user.name});
                return res.status(200).json({ msg: 'Your account has been created', token }); 
            }else{
                return res.status(400).json({ errors: [{msg: `${email} is already taken`}] }); 
            }
        }catch(err){
            console.log(err.message);
            return res.status(500).json("server error...!!!");
        }
    }else{
        return res.status(400).json({ errors: errors.array() });
    }
}


module.exports.loginController = async (req, res) => {
    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {email, password} = req.body;
        try{
            const user = await User.findOne({email});
            if(user){
                console.log(user);
                const isMatched = await comparePassword(password, user.password);
                if(isMatched){
                    const token = jwtToken({id: user._id, name: user.name});
                    if(user.admin){
                        return res.status(200).json({token, admin: true});
                    }else{
                        return res.status(200).json({token, admin: false});
                    }
                }else{
                    return res.status(400).json({ errors: [{msg: `Invalid credential`}] }); 
                }
            }else{
                return res.status(400).json({ errors: [{msg: `${email} is not found`}] }); 
            }
        }catch(err){
            console.log(err.message);
            return res.status(500).json("server error...!!!");
        }
    }else{
        return res.status(400).json({ errors: errors.array() });
    }
}