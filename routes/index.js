const express = require('express')
const router = express.Router()
const Game = require('../models/game')
const Question = require('../models/question')
const User = require('../models/user')

function randomNumber(num) {
  return Math.floor(Math.random() * num)
}

const categories = {
  9: 'General Knowledge',
  // '10': 'Books',
  11: 'Film',
  12: 'Music',
  // '14': 'Television',
  15: 'Video Games',
  // '16': 'Board Games',
  17: 'Science & Nature',
  18: 'Computers',
  19: 'Mathematics',
  20: 'Mythology',
  // '21': 'Sports',
  22: 'Geography',
  23: 'History',
  24: 'Politics',
  // '27': 'Animals',
  31: 'Anime & Manga',
}

const categoriesKeys = Object.keys(categories)
const categoriesNumber = categoriesKeys.length

router.get('/logout', function (req, res) {
  req.logout()
  res.json({ message: 'logout succesful' })
})

router.get('/new', async function (req, res, next) {
  //проверка, есть ли незаконченная игра
  const user = await User.findById(req.user._id).populate('games')
  const unfinishedGame = user.games.find((game) => game.isFinished === false)
  if (unfinishedGame) {
    // res.set('isNew', 'false')
    // res.header("isNew", false)
    console.log(unfinishedGame)
    return res.json(unfinishedGame)
  }

  // создание новой игры
  const newGameCategories = []
  const usedCategories = []
  const newGameQuestions = []

  // random categories for new game
  for (let i = 1; i <= 5; i++) {
    let added = false
    while (!added) {
      let tempIdx = randomNumber(categoriesNumber - 1)
      if (!usedCategories.includes(tempIdx)) {
        newGameCategories.push(categories[categoriesKeys[tempIdx]])
        usedCategories.push(tempIdx)
        added = true
      }
    }
  }

  // find random questions for each category & difficulty level
  for (let i = 0; i <= 4; i++) {
    const allQuestionsFromCategory = await Question.find({
      category: newGameCategories[i],
    })

    for (let j = 0; j <= 4; j++) {
      const questionsByDifficulty = allQuestionsFromCategory.filter(
        (question) => question.ourDifficulty === j
      )
      const randomQuestionNumber = randomNumber(
        questionsByDifficulty.length - 1
      )
      newGameQuestions.push(questionsByDifficulty[randomQuestionNumber])
    }
  }

  const newGame = new Game({
    userId: user._id,
    questions: newGameQuestions,
  })
  await newGame.save()
  user.games.push(newGame._id)
  user.save()
  res.json(newGame)
})

router.post('/save', async function (req, res) {
  const { _id, userId, lives, isFinished, score, questions } = req.body

  const game = await Game.findOne({ _id })
  game.isFinished = isFinished
  game.score = score
  game.live = lives
  game.questions = questions
  game.save()

  if (isFinished) {
    const user = await User.findOne({ _id: userId })
    if (score > user.highestScore) user.highestScore = score
    user.averageScore =
      user.averageScore +
      (score - user.averageScore) * (1 / (1 + user.games.length))
    user.save()
  }
  res.json('message: game saved successfully')
})

router.get('/stats', async (req, res) => {
  const user = await User.findById(req.user._id)
  res.json({
    games: user.games.length,
    highestScore: user.highestScore,
    averageScore: user.averageScore,
  })
})

module.exports = router
