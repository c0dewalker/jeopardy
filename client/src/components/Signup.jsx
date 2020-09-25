import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLoginAC } from '../store/actions'
import { Row, Col, Form, Input, Button } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const axiosQ = axios.create({ withCredentials: true })

export default function LoginForm() {

  const history = useHistory()
  const dispatch = useDispatch()

  const onFinish = async values => {
    console.log('Received values of form: ', values);
    const response = await axiosQ.post('http://localhost:3001/signup', values)
    console.log(response)
    if (response.status === 200)
      dispatch(userLoginAC(response.data))
    history.push('/')
  };

  return (
    <div style={{
      background: `linear-gradient(
        rgba(0, 0, 0, 0.65),
        rgba(0, 0, 0, 0.65)
      ), url("https://dfw.cbslocal.com/wp-content/uploads/sites/15909545/2014/03/jeopardy_98521822.jpg")`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <Row justify="center">
      <Col span={10}>
        <Form
          className="login-form"
          onFinish={onFinish}
          style={{
            backgroundColor: 'white',
            border: '1px solid black',
            padding: '30px 20px 20px 20px',
            margin: '70px'
          }}
        >
          <Form.Item>
            <h1>Sign Up</h1>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your Email' }]}
          >
            <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password" />
          </Form.Item>


          <Form.Item>
            <Button style={{ marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
              Sign Up
        </Button>
        Or <a href="/login">Login!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </div>
  )
}
