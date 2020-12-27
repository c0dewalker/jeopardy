import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchGameDataThunk } from '../../../store/game'
import { Button } from 'antd'

export default function GameResults({ score }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const style = { margin: '15px' }

  const startNewGameHandler = async () => {
    dispatch(fetchGameDataThunk())
    history.push('/game')
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
        <div game-results__buttons>
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
    </div>
  )
}
