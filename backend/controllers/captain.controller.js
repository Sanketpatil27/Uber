const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;
    const hashedPassword = await captainModel.hashedPassword(password);

    const isCaptainExist = await captainModel.findOne({ email });
    if(isCaptainExist) {
        return res.status(400).json({ message: 'captain already exist' });
    }
    
    const captain = await captainService.createCaptain({
        firstname: fullname.firstname,
        lastname: fullname?.lastname,
        email,
        password: hashedPassword,
        color: vehicle.color,
        plate: vehicle.plate,
        capacity: vehicle.capacity,
        vehicleType: vehicle.vehicleType,
        location: vehicle.location
    });

    const token = captain.generateAuthToken(captain._id);
    res.status(201).json({ token, captain });
}

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain) {
        return res.status(411).json({ message: "Invalid Email or Password!!" });
    }

    const isMatch = await captain.comparePassword(password, captain.password)
    if(!isMatch) {
        return res.status(411).json({ message: "Invalid Email or Password!!" });
    }

    // generate token 
    const token = captain.generateAuthToken(captain._id);

    res.cookie('token', token);

    return res.status(200).json({ token, captain });
}

module.exports.getCaptainProfile = async(req, res, next) => {
    if(!req.captain) {
        return res.status(400).json({ message: "captain profile doesn't exist!" });
    }

    return res.status(200).json({ captain: req.captain });
}


module.exports.logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie('token');

    await blackListTokenModel.create({ token });
    res.status(200).json({ message: "Logout successful" });
}