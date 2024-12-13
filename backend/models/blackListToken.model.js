const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
    token: {
        type: String, 
        require: true,
        unique: true
    },

    createdAt: {
        type: Date, 
        default: Date.now,
        expires: 86400   // expires after 24 hours
    }
});

module.exports = mongoose.model('BlackListToken', blackListTokenSchema);