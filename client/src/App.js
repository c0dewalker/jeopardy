import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Desktop from './components/Desktop'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Profile from './components/Profile'
import Header from './components/Header'
import 'antd/dist/antd.css'

export default function App() {
  return (
    <>
      <Header />
      <div className="wrapper">
        <Switch>
          <Route exact path="/" component={Desktop} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/desktop" component={Desktop} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/profile" component={Profile} />
        </Switch>
      </div>
    </>
  )
}
