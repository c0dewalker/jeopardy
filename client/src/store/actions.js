import types from './types'

export const initializeNewGameAC = (newGame) => ({ type: types.INITIALIZE_NEW_GAME, payload: newGame })
export const userLoginAC = (user) => ({ type: types.USER_LOGIN, payload: user })
export const logoutAC = () => ({ type: types.LOGOUT })
export const startNewGameAC = () => ({ type: types.START_NEW_GAME })
export const setIsPlayingTrueAC = () => ({ type: types.SET_IS_PLAYING_TRUE })
export const setIsPlayingFalseAC = () => ({ type: types.SET_IS_PLAYING_FALSE })
export const startQuestionModalAC = (_id) => ({ type: types.START_QUESTION_MODAL, payload: _id })
export const sendAnswerAC = (value, _id) => ({ type: types.SEND_ANSWER, answer: value, _id: _id })
export const markGameAsFinishedAC = () => ({ type: types.MARK_GAME_AS_FINISHED })




