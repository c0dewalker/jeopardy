import React from 'react'
import { Row, Col } from 'antd'
import Question from './Question'

const Category = (props) => {
  const questions = props.questions
  const title = questions[0]?.category

  return (
    <Row className="category" align="middle">
      <Col flex="250px">
        <div className="category-name"><p>{title}</p></div>
      </Col>
      {questions.map(question => (
        <Col key={question._id} flex="auto" className="border">
          <div className="item">
              <Question key={question._id} question={question} />
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default Category
