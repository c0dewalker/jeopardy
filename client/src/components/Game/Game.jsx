import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGameDataThunk, gameFinishedAC } from '../../store/game'

import Category from './Category/Category'
import ModalQuestion from './ModalQuestion/ModalQuestion'
import GameResults from './GameResults/GameResults'

import axios from 'axios'

const axiosCors = axios.create({ withCredentials: true })

export default function Game() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  const { gameStatus, questions = [], score, lives } = useSelector(
    (state) => state
  )
  const isFinished = gameStatus === 'finished'

  async function saveFinishedGame(stateObject) {
    await axiosCors.post('http://localhost:3001/save', stateObject)
  }
  useEffect(() => {
    if (gameStatus === 'notReady') dispatch(fetchGameDataThunk())
    if (gameStatus === 'finished') saveFinishedGame(state)
  }, [gameStatus, state])

  useEffect(() => {
    if (lives === 0) dispatch(gameFinishedAC())
  }, [lives])

  //  useEffect(() => {
  //    if (isFinished) saveFinishedGame(state)
  //  }, [isFinished, state])

  if (questions.length) {
    const question = questions.find((question) => question.visible === true)

    questions.sort((a, b) => a.category - b.category)
    const cat1 = questions.slice(0, 5)
    const cat2 = questions.slice(5, 10)
    const cat3 = questions.slice(10, 15)
    const cat4 = questions.slice(15, 20)
    const cat5 = questions.slice(20, 25)

    return (
      <div className="game-container">
        <Category key={1} questions={cat1} />
        <Category key={2} questions={cat2} />
        <Category key={3} questions={cat3} />
        <Category key={4} questions={cat4} />
        <Category key={5} questions={cat5} />
        {isFinished && <GameResults score={score} />}
        {question && <ModalQuestion question={question} />}
      </div>
    )
  }

  return null
}
