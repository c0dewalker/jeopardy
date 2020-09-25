import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { userLoginAC } from '../store/actions'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'

const axiosCors = axios.create({ withCredentials: true })

export default function LoginForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const onFinish = async (values) => {
    const response = await axiosCors.post('http://localhost:3001/login', values)
    if (response.status === 200) {
      dispatch(userLoginAC(response.data))
      history.push('/')
    }
  }

  return (
    <div className="login">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              required: true,
              message: 'Please input your Email',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
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
          <Button
            style={{ marginBottom: '10px' }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/signup">sign up!</a>
        </Form.Item>
      </Form>
    </div>
  )
}
