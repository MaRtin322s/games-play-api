const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { SECRET } = require('../../config/constants');
const jwtVerify = promisify(jwt.verify);

exports.auth = async (req, res, next) => {
    const token = req.headers['x-authorization'];

    if (token) {
        const decodedToken = await jwtVerify(token, SECRET);
        req.user = decodedToken._id;
        next();
    } else {
        next();
    }
}