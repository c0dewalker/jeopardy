import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header/Header'
import Desktop from './Desktop/Desktop'
import Game from './Game/Game'
import Login from './Login/Login'
import Signup from './Signup/Signup'
import Profile from './Profile/Profile'
import PrivateRoute from './common/PrivateRoute'
import 'antd/dist/antd.css'

export default function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/" component={Desktop} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/desktop" component={Desktop} />
            <PrivateRoute exact path="/game" component={Game} />
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    </>
  )
}
