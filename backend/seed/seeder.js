require('dotenv').config()
const mongoose = require('mongoose')
const Question = require('../models/question')
const axios = require('axios')
const Entities = require('html-entities').AllHtmlEntities
const entities = new Entities()

mongoose.connect(process.env.MONGO_CONNECT, { useNewUrlParser: true })
// mongoose.connect('mongodb://localhost:27017/jeopardy', { useNewUrlParser: true });

const categories = {
  '9': 'General Knowledge',
  // '10': 'Books',
  '11': 'Film',
  '12': 'Music',
  // '14': 'Television',
  '15': 'Video Games',
  // '16': 'Board Games',
  '17': 'Science & Nature',
  '18': 'Computers',
  '19': 'Mathematics',
  '20': 'Mythology',
  // '21': 'Sports',
  '22': 'Geography',
  '23': 'History',
  '24': 'Politics',
  // '27': 'Animals',
  '31': 'Anime & Manga'
}

const categoriesKeys = Object.keys(categories)
const difficulty = ['easy', 'medium', 'hard']
const type = ['boolean', 'multiple']

const problematicCategories = []

seeder()

async function seeder() {

  for (let q = 0; q < categoriesKeys.length; q++) {    //< categoriesKeys.length
    console.log('q', q)
    for (let d = 0; d < difficulty.length; d++) {
      console.log('d', d)
      for (let t = 0; t < type.length; t++) {
        console.log('t', t)

        for (let n = 20; n >= 2; n--) {
          console.log('n', n)

          const response = await axios(`https://opentdb.com/api.php?amount=${n}&category=${categoriesKeys[q]}&difficulty=${difficulty[d]}&type=${type[t]}`)

          if (response.data.response_code === 0) {
            response.data.results.forEach(question => {

              const allAnswers = []
                .concat(question.incorrect_answers, [question.correct_answer])
                .sort()

              let ourDifficulty
              if (d == 0 && t == 0) ourDifficulty = 0
              else if (d == 0 && t == 1) ourDifficulty = 1
              else if (d == 1 && t == 0) ourDifficulty = 2
              else if (d == 1 && t == 1) ourDifficulty = 3
              else if (d == 2 && t == 1) ourDifficulty = 4
              else ourDifficulty = 99

              const newQuestion = new Question({
                categoryId: q,
                category: categories[categoriesKeys[q]],
                difficulty: difficulty[d],
                type: type[t],
                ourDifficulty,
                points: (ourDifficulty + 1) * 200,
                question: entities.decode(question.question),
                answers: allAnswers,
                correctAnswer: question.correct_answer
              })
              newQuestion.save()
            })

            break
          }
          if (n === 2) problematicCategories.push([categories[categoriesKeys[q]], 'easy', d, 'да нет', t])
        }
      }
    }
  }
  console.log('finished')
  console.log(problematicCategories)

}

