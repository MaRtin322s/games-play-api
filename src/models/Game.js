const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    category: {
        type: String, 
        required: true
    },
    maxLevel: {
        type: Number, 
        required: true
    },
    imageUrl: {
        type: String, 
        required: true
    },
    summary: {
        type: String, 
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: Object
    }]
},
{ timestamps: true });

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;