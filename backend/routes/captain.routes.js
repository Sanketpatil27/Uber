const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const { authCaptain } = require('../middlewares/auth.middleware');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long!!'),
    body('vehicle.color'),
    body('vehicle.vehicleType'),
    body('vehicle.plate'),
    body('vehicle.location'),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage('capacity must be at least 1')
] , captainController.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage("Password must be atleast 6 characters long")
], captainController.login);

router.get('/profile', authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;