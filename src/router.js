const router = require('express').Router();
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');

router.use('/users', authController);
router.use('/data', gameController);

module.exports = router;