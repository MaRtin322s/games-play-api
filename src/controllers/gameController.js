const router = require('express').Router();
const { default: mongoose } = require('mongoose');
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
    game['_ownerId'] = game._ownerId.toString();
    res.json(game);
});

router.post('/games', async (req, res) => {
    const { title, category, maxLevel, imageUrl, summary } = req.body;
    const owner = req.user;
    const game = await gameService.createGame({ title, category, maxLevel, imageUrl, summary, _ownerId: owner });
    res.json(game);
});

router.put('/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const gameData = req.body;
    const game = await gameService.editGame(gameId, gameData);
    res.json(game);
});

router.delete('/games/:gameId', async (req, res) => {
    const gameId = req.params.gameId;
    const game = await gameService.deleteGame(gameId);
    res.json(game);
});

router.get(`/comments/:gameId`, async (req, res) => {
    const gameId = req.params.gameId;
    const game = await gameService.getOne(gameId);
    const comments = game.comments;
    res.json(comments);
});

router.post('/comments', async (req, res) => {
    const data = req.body;
    const id = data.gameId;
    const comment = await gameService.createComment(data);
    await gameService.commentGame(id, comment);
    res.json('ready');
});

module.exports = router;