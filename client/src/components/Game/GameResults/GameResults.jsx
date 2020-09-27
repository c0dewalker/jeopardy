import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  startNewGameAC,
  initializeNewGameAC,
  setIsPlayingTrueAC,
} from '../../../store/actions'
import { Button } from 'antd'
import axios from 'axios'

export default function GameResults({ score }) {
  const axiosCors = axios.create({ withCredentials: true })
  const dispatch = useDispatch()
  const history = useHistory()
  const style = { margin: '15px' }

  const startNewGameHandler = async () => {
    dispatch(startNewGameAC())
    const response = await axiosCors('http://localhost:3001/new')
    const newGame = response.data
    dispatch(initializeNewGameAC(newGame))
    dispatch(setIsPlayingTrueAC())
    history.push('/home')
  }

  function cancelHandler() {
    history.push('/')
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>GAME OVER</h2>
        <h4>Your score is:</h4>
        <h2>{score}</h2>
        <Button
          type="primary"
          size="large"
          style={style}
          onClick={startNewGameHandler}
        >
          Start new game
        </Button>
        <Button
          type="primary"
          size="large"
          style={style}
          onClick={cancelHandler}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
