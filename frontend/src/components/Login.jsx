import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLoginAC } from '../store/actions'
import { Row, Col, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const axiosQ = axios.create({ withCredentials: true })

export default function LoginForm() {

  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async values => {
    const response = await axiosQ.post('http://localhost:3001/login', values)
    if (response.status === 200) {
      dispatch(userLoginAC(response.data))
      history.push('/')
    }
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
      <Row justify="center" align="middle">
      <Col span={10}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ backgroundColor: 'white', border: '1px solid black', padding: '30px 20px 20px 20px', margin: '70px' }}
        >
          <Form.Item>
            <h1>Login</h1>
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ type: 'email', required: true, message: 'Please input your Email' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              {/* <Checkbox>Remember me</Checkbox> */}
            </Form.Item>

          </Form.Item>

          <Form.Item>
            <Button style={{ marginBottom: '10px' }} type="primary" htmlType="submit" className="login-form-button">
              Log in
        </Button>
        Or <a href="/signup">sign up!</a>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </div>
  )
}
