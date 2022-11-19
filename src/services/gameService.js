const Game = require('../models/Game');
const Comment = require('../models/Comment');

exports.getAll = async () => await Game.find().lean();
exports.createGame = async (gameData) => await Game.create(gameData);
exports.lastGames = async () => await Game.find().sort({ createdAt: 1 }).limit(3).lean();
exports.getOne = async (gameId) => await Game.findById({ _id: gameId }).lean();
exports.editGame = async (gameId, gameData) => await Game.findByIdAndUpdate({ _id: gameId}, gameData);
exports.deleteGame = async (gameId) => await Game.findByIdAndDelete({ _id: gameId });
exports.createComment = async (commentData) => await Comment.create(commentData);
exports.commentGame = async (gameId, gameData) => await Game.findByIdAndUpdate({ _id: gameId}, { $push: { comments: gameData }});