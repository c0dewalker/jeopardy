import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from "react-router-dom"
import { logoutAC } from '../store/actions'
import Score from './Score'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import axios from 'axios'

const axiosQ = axios.create({ withCredentials: true })

export default function Navbar() {

  const {name, isAuth, initialized, isNew, isPlaying } = useSelector(state => state)
  const fullState = useSelector(state => state)

  const dispatch = useDispatch()

  const showStartNew = (isAuth && isNew && !isPlaying)
  const showContinueGame = (isAuth && !isNew && !isPlaying)
  const showScore = (isAuth && isPlaying)

  const logoutHandler = async () => {
    if (initialized) {
      const responseSave = await axiosQ.post('http://localhost:3001/save', fullState)
      console.log(responseSave)
    }
    const responseLogout = await axiosQ.get('http://localhost:3001/logout')
    console.log(responseLogout)
    dispatch(logoutAC())
  }

  return (
    <header>
      <nav>
        <div className="nav-logo">
          <NavLink to='/'>
            <img height="50px" alt="logo" src="https://freepikpsd.com/wp-content/uploads/2019/10/jeopardy-logo-png-3-Transparent-Images.png" />
          </NavLink>
        </div>

        <div className="nav-center">
          {(showStartNew) && <NavLink to='/home'><Button size="large" shape="round"><strong>Start new game!</strong></Button></NavLink>}
          {(showContinueGame) && <NavLink to='/home'><Button size="large" shape="round"><strong>Start new game!</strong></Button></NavLink>}
          {(showScore) && <Score />}
        </div>

        <div className="nav-right">
          {!isAuth &&
            <NavLink className="nav-item" to='/login'>Login</NavLink>}
          {!isAuth &&
            <NavLink className="nav-item" to='/signup'>Signup</NavLink>}
          {isAuth &&
            <NavLink className="nav-item" to='/profile'>{name}</NavLink>}
          {isAuth &&
            <NavLink className="nav-item" to='/' onClick={() => logoutHandler()}>Logout</NavLink>}
        </div>
      </nav>
    </header>
  )
}
