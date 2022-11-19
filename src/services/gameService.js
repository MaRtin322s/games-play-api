const Game = require('../models/Game');

exports.getAll = async () => await Game.find().lean();
exports.createGame = async (gameData) => await Game.create(gameData);
exports.lastGames = async () => await Game.find().sort({ createdAt: 1 }).limit(3).lean();
exports.getOne = async (gameId) => await Game.findById({ _id: gameId }).lean();