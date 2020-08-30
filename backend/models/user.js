const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  highestScore: { type: Number, default: 0 },
  averageScore: { type: Number, default: 0 },
  games: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Game',
    default: []
  },
})

module.exports = mongoose.model('User', userSchema)
