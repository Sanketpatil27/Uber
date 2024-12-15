const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListTokenModel = require('../models/blackListToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    // check if the token isn't blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if(isBlacklisted) {
        return res.status(401).json({ message: "Sorry please login again!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const user  = await userModel.findById(decoded._id);
        req.user = user;        // stored user on request parameter
        next();

    } catch(err) {
        return res.status(401).json({ message: "Unauthorized"});
    }
}


module.exports.authCaptain = async(req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token) {
        return res.status(401).json({ message: "Unauthorized"});
    }

    // check if the token isn't blacklisted
    const isBlacklisted = await blackListTokenModel.findOne({ token });
    if(isBlacklisted) {
        return res.status(401).json({ message: "Sorry please login again!"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        const captain  = await captainModel.findById(decoded._id).select('-password');
        req.captain = captain;        // stored captain on request parameter
        next();

    } catch(err) {
        return res.status(401).json({ message: "Unauthorized"});
    } 
}