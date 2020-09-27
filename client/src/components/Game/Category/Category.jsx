import React from 'react'
import Question from './Question/Question'

const Category = (props) => {
  const questions = props.questions
  const title = questions[0]?.category

  return (
    <div className="category">
      <div className="category-name">
        <p>{title}</p>
      </div>
      {questions.map((question) => (
        <div key={question._id} className="item">
          <Question key={question._id} question={question} />
        </div>
      ))}
    </div>
  )
}

export default Category
