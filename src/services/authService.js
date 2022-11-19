const User = require('../models/User');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS, SECRET } = require('../../config/constants');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const jwtSign = promisify(jwt.sign);

exports.registerUser = async ({ email, password }) => {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ email, password: hashedPassword });
    return user;
}


exports.generateToken = async (user) => {
    const token = await jwtSign({ _id: user._id }, SECRET, { expiresIn: '2h' });
    return token;
}