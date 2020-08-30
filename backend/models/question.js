const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  categoryId: Number,
  category: String,
  difficulty: String,
  type: String,
  ourDifficulty: Number,
  points: Number,
  question: String,
  answers: [String],
  correctAnswer: String,
  isAnswered: { type: Boolean, default: false }
})

module.exports = mongoose.model('Question', questionSchema)
