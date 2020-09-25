import types from './types'

const initialState = {
  initialized: false,
  isAuth: false,
  isPlaying: false
}

export default function reducer(state = initialState, action) {

  switch (action.type) {

    case types.START_QUESTION_MODAL: {

      const questions = state.questions
      const newQuestions = questions.map((question) => {
        if (question._id === action.payload) question.visible = true
        return question
      })
      return { ...state, questions: newQuestions }
    }

    case types.SEND_ANSWER: {
      // receives: action.answer & action._id
      const questions = state.questions
      const question = questions.find(item => item._id === action._id)

      questions.forEach(item => {
        item.visible = false
        if (item._id === action._id) question.isAnswered = true
      })
      let newScore, newLives
      if (question.correctAnswer === action.answer) {
        newScore = state.score + question.points
        newLives = state.lives
      } else {
        newScore = state.score - question.points
        newLives = state.lives - 1
      }

      return { ...state, questions: questions, score: newScore, lives: newLives }
    }


    case types.INITIALIZE_NEW_GAME: {
      // const isNew = (Date.now() - Date.parse(action.payload.startedAt)) < 10000
      return {
        ...state,
        initialized: true,
        ...action.payload,
        questions: action.payload.questions.map(question => ({
          ...question,
          visible: false,
        })),
      }
    }


    case types.USER_LOGIN: {
      //receives the user object as payload
      console.log(action)
      return {
        ...state,
        isAuth: true,
        name: action.payload.username,
        userId: action.payload._id
      }
    }


    case types.MARK_GAME_AS_FINISHED: {
      return { ...state, isFinished: true }
    }


    case types.START_NEW_GAME: {
      return {
        initialized: false,
        isAuth: state.isAuth,
        name: state.name,
        userId: state.userId,
      }
    }


    case types.SET_IS_PLAYING_TRUE: {
      return { ...state, isPlaying: true }
    }


    case types.SET_IS_PLAYING_FALSE: {
      return { ...state, isPlaying: false }
    }

    case types.LOGOUT: {
      return initialState
    }


    default:
      return state
  }
}
