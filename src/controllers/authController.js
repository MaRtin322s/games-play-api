const router = require('express').Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
});

module.exports = router;