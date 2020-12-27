import axios from 'axios'
const axiosCors = axios.create({ withCredentials: true })

const initialState = {
  gameStatus: 'notReady', // started', 'paused', 'finished'
  fetchStatus: 'idle', // 'idle', 'pending', 'fulfilled', 'rejected'
  questions: [],
  score: null,
  lives: null,

  isAuth: false,
  name: null,
  userId: null,
}

// TYPES
//

// old
const INITIALIZE_NEW_GAME = 'INITIALIZE_NEW_GAME'
const MARK_GAME_AS_FINISHED = 'MARK_GAME_AS_FINISHED'

// new
const GAME_NOT_READY = 'GAME_NOT_READY'
const GAME_STARTED = 'GAME_STARTED'
const GAME_PAUSED = 'GAME_PAUSED'
const GAME_FINISHED = 'GAME_FINISHED'

const USER_LOGIN = 'USER_LOGIN'
const LOGOUT = 'LOGOUT'

const START_NEW_GAME = 'START_NEW_GAME'
const GET_QUESTION = 'GET_QUESTION'
const START_QUESTION_MODAL = 'START_QUESTION_MODAL'
const SEND_ANSWER = 'SEND_ANSWER'
const ANSWER_TIME_OVER = 'ANSWER_TIME_OVER'

// FETCH_IDLE, FETCH_PENDING, FETCH_RESOLVED, FETCH_REJECTED
const FETCH_IDLE = 'FETCH_IDLE'
const FETCH_PENDING = 'FETCH_PENDING'
const FETCH_RESOLVED = 'FETCH_RESOLVED'
const FETCH_REJECTED = 'FETCH_REJECTED'

// ACTIONS
//

export const fetchPendingAC = () => ({ type: FETCH_PENDING })
export const fetchIdleAC = () => ({ type: FETCH_IDLE })
export const fetchRejectedAC = () => ({ type: FETCH_REJECTED })

export const initializeNewGameAC = (newGame) => ({
  type: INITIALIZE_NEW_GAME,
  payload: newGame,
})

export const startNewGameAC = () => ({ type: START_NEW_GAME })

export const gameStartedAC = () => ({ type: GAME_STARTED })
export const gamePausedAC = () => ({ type: GAME_PAUSED })
export const gameFinishedAC = () => ({ type: GAME_FINISHED })
export const continueGameAC = () => ({ type: GAME_STARTED })
export const gameNotReadyAC = () => ({ type: GAME_NOT_READY })

export const startQuestionModalAC = (_id) => ({
  type: START_QUESTION_MODAL,
  payload: _id,
})
export const sendAnswerAC = (value, _id) => ({
  type: SEND_ANSWER,
  answer: value,
  _id: _id,
})

export const userLoginAC = (user) => ({ type: USER_LOGIN, payload: user })
export const logoutAC = () => ({ type: LOGOUT })

// Thunks
export const loginThunk = (values, redirectCallback) => async (dispatch) => {
  try {
    dispatch(fetchPendingAC())
    const response = await axiosCors.post('http://localhost:3001/login', values)
    console.log('CHEEEEEEEEEEE', response)
    dispatch(userLoginAC(response.data))
    dispatch(fetchIdleAC())
    redirectCallback()
  } catch (e) {
    console.log(e.message)
    dispatch(fetchRejectedAC())
  }
}

export const signUpThunk = (values, redirectCallback) => async (dispatch) => {
  try {
    dispatch(fetchPendingAC())
    const response = await axiosCors.post(
      'http://localhost:3001/signup',
      values
    )
    dispatch(userLoginAC(response.data))
    dispatch(fetchIdleAC())
    redirectCallback()
  } catch (e) {
    console.log(e.message)
    dispatch(fetchRejectedAC())
  }
}

export const fetchGameDataThunk = () => async (dispatch) => {
  try {
    const response = await axiosCors('http://localhost:3001/new')
    const newGame = response.data
    dispatch(initializeNewGameAC(newGame))
  } catch (e) {
    console.log(e.message)
  }
}

//
// REDUCER
//

export default function gameReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    ///////  FETCH STATUS ///////
    case FETCH_PENDING: {
      return { ...state, fetchStatus: FETCH_PENDING }
    }
    case FETCH_RESOLVED: {
      return { ...state, fetchStatus: FETCH_RESOLVED }
    }
    case FETCH_REJECTED: {
      return { ...state, fetchStatus: FETCH_REJECTED }
    }
    case FETCH_IDLE: {
      return { ...state, fetchStatus: FETCH_IDLE }
    }

    ///////  GAME STATUS ///////
    case GAME_STARTED: {
      return { ...state, gameStatus: 'started' }
    }
    case GAME_PAUSED: {
      return { ...state, gameStatus: 'paused' }
    }
    case GAME_FINISHED: {
      return { ...state, gameStatus: 'finished' }
    }
    case GAME_NOT_READY: {
      return { ...state, gameStatus: 'notReady' }
    }

    case START_NEW_GAME: {
      return {
        initialized: false,
        isAuth: state.isAuth,
        name: state.name,
        userId: state.userId,
      }
    }

    case MARK_GAME_AS_FINISHED: {
      return { ...state, isFinished: true }
    }

    ///////  GAME ACTIONS ///////
    case START_QUESTION_MODAL: {
      const questions = state.questions
      const newQuestions = questions.map((question) => {
        if (question._id === action.payload) question.visible = true
        return question
      })
      return { ...state, questions: newQuestions }
    }

    case INITIALIZE_NEW_GAME: {
      console.log('PAYLOAD', payload)
      return {
        ...state,
        initialized: true,
        gameStatus: 'started',
        ...payload,
        questions: payload.questions.map((question) => ({
          ...question,
          visible: false,
        })),
      }
    }

    case SEND_ANSWER: {
      // receives: action.answer & action._id
      const questions = state.questions
      const question = questions.find((item) => item._id === action._id)

      questions.forEach((item) => {
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
      return {
        ...state,
        questions: questions,
        score: newScore,
        lives: newLives,
      }
    }

    ///////  AUTH ///////
    case USER_LOGIN: {
      //receives the user object as payload
      return {
        ...state,
        isAuth: true,
        name: payload.username,
        userId: payload._id,
      }
    }

    case LOGOUT: {
      return initialState
    }

    default:
      return state
  }
}
