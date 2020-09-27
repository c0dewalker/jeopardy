import React from 'react'
import { useDispatch } from 'react-redux'
import { sendAnswerAC } from '../../../../store/actions'

const Option = ({ option, question }) => {
  const dispatch = useDispatch()
  return (
    <>
      <button
        className="modal-button"
        onClick={() => dispatch(sendAnswerAC(option, question._id))}
      >
        {option}
      </button>
    </>
  )
}

export default Option
