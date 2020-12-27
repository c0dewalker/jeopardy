import React from 'react'
import { useDispatch } from 'react-redux'
import { startQuestionModalAC } from '../../../../store/game'

export default function Question(props) {
  const { _id, points, isAnswered } = props.question
  const dispatch = useDispatch()

  return (
    <div
      className="question"
      onClick={() => {
        if (!isAnswered) dispatch(startQuestionModalAC(_id))
      }}
    >
      {!isAnswered && <p className="question__points">{points}</p>}
    </div>
  )
}
