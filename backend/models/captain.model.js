const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// captain is a vehicle owner

const captainSchema = mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String, 
        required: true,
        unique: true
    },

    socketId: {
        type: String
    },

    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
        },
        plate: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            reuqired: true,
            min: [1, 'Capacity must be at least 1'],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        },
        
        location: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            }
        }
    }
});

captainSchema.methods.generateAuthToken = (_id) => {
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

captainSchema.methods.comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

captainSchema.statics.hashedPassword = async(password) => {
    return await bcrypt.hash(password, 10);
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;