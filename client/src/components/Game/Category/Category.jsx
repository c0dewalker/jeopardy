import React from 'react'
import Question from './Question/Question'

const Category = (props) => {
  const questions = props.questions
  const title = questions[0]?.category

  return (
    <div className="category">
      <div className="category-name-container">
        <p className="category-name">{title}</p>
      </div>
      {questions.map((question) => (
        <Question key={question._id} question={question} />
      ))}
    </div>
  )
}

export default Category
