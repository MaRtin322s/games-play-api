const router = require('express').Router();
const authService = require('../services/authService');

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    
});

router.post('/register', async (req, res) => {
    const { email, ...passwords } = req.body;
    try {
        if (passwords['password'] == passwords['confirm-password']) {
            const user = await authService.registerUser({ email, password: passwords['password'] });
            if (typeof user == 'object') {
                const token = await authService.generateToken(user);
                res.json({
                    email,
                    _id: user._id,
                    accessToken: token
                });
            }
        } else {
            throw {
                message: 'Invalid email or password!'
            }
        }
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;