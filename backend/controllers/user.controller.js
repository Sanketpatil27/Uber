const userModel = require('../models/user.model')
const userService = require('../services/user.services');
const  { validationResult } = require('express-validator');


module.exports.registerUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password)
    
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname, 
        email, 
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.json({ error: errors.array() })
    }

    // find user in db
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    console.log(user);
    if(!user) {
        return res.status(401).json({ msg: "Envalid Email or password!"});
    }

    const isMatch = await user.comparePassword(password, user.password);
    if(!isMatch) {
        return res.status(401).json({ msg: "Envalid Email or password!"});
    }

    const token = user.generateAuthToken();
    return res.status(200).json({ token, user });
}