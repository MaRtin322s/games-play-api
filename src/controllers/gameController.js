const router = require('express').Router();
const gameService = require('../services/gameService');

router.get('/games', async (req, res) => {
    const allGames = await gameService.getAll();
    res.json(allGames);

});

router.get('/games?sortBy=_createdOn%20desc&distinct=category', async (req, res) => {
    const allGames = await gameService.lastGames();
    res.json(allGames);

});

router.get('/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const game = await gameService.getOne(gameId);
    res.json(game);
});

router.post('/games', async (req, res) => {
    const { title, category, maxLevel, imageUrl, summary } = req.body;
    const owner = req.user;
    const game = await gameService.createGame({ title, category, maxLevel, imageUrl, summary, owner });
    res.json(game);
});

module.exports = router;