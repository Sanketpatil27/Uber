const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            // minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
        },
    },

    email: {
        type: String,
        required: true,
        unique: true
    }, 
    
    password: {
        type: String,
        required: true,
        select: false
    },

    // for live tracking
    socketId: {
        type: String
    }
});

userSchema.methods.generateAuthToken = (_id) => {
    const token = jwt.sign({ _id } ,process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
}

userSchema.statics.hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;