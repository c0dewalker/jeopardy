import React from 'react'
import { useDispatch } from 'react-redux'
import { sendAnswerAC } from '../store/actions'
import ReactCountdownClock from 'react-countdown-clock'
import Option from './Option'

export default function ModalQuestion({ question }) {
  const dispatch = useDispatch()

  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="timer">
          <ReactCountdownClock
            seconds={20}
            color="red"
            alpha={0.9}
            size={65}
            onComplete={() => dispatch(sendAnswerAC('', question._id))}
          />
        </span>
        <h1 className="timer-heading">{question.points} points question</h1>
        <p>{question.question}</p>
        <ul>{question.answers.map((option, index) => <Option key={index} option={option} question={question} />)}</ul>
      </div>
    </div>
  )
}