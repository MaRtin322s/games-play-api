const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters!']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;