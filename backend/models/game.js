const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  userId: String,
  startedAt: { type: Date, default: Date.now() },
  isFinished: { type: Boolean, default: false },
  lives: { type: Number, default: 3 },
  score: { type: Number, default: 0 },
  questions: [Object]
})

module.exports = mongoose.model('Game', gameSchema)
