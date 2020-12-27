import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { loginThunk } from '../../store/game'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

export default function LoginForm() {
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <div className="background-image">
      <div className="modal-background">
        <div className="login-form">
          <Form
            name="normal_login"
            initialValues={{ remember: true }}
            onFinish={(values) =>
              dispatch(
                loginThunk(values, () => {
                  history.push('/')
                })
              )
            }
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
              rules={[
                { required: true, message: 'Please input your Password!' },
              ]}
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
      </div>
    </div>
  )
}
