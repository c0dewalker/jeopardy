import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button } from 'antd'
import { logoutAC } from '../../store/actions'
import Score from './Score/Score'
import axios from 'axios'
import 'antd/dist/antd.css'

const axiosCors = axios.create({ withCredentials: true })

export default function Header() {
  const { name, isAuth, initialized, isNew, isPlaying } = useSelector(
    (state) => state
  )
  const fullState = useSelector((state) => state)

  const dispatch = useDispatch()

  const showStartNew = isAuth && isNew && !isPlaying
  const showContinueGame = isAuth && !isNew && !isPlaying
  const showScore = isAuth && isPlaying

  const logoutHandler = async () => {
    if (initialized) {
      const responseSave = await axiosCors.post(
        'http://localhost:3001/save',
        fullState
      )
    }
    const responseLogout = await axiosCors.get('http://localhost:3001/logout')
    dispatch(logoutAC())
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav__left-block">
          <NavLink to="/">
            <img
              className="nav__logo"
              src="https://freepikpsd.com/wp-content/uploads/2019/10/jeopardy-logo-png-3-Transparent-Images.png"
              alt="Jeopardy Logo"
            />
          </NavLink>
        </div>

        <div className="nav__center-block">
          {showStartNew && (
            <NavLink to="/home">
              <button className="start-button">
                <strong>Start new game!</strong>
              </button>
            </NavLink>
          )}
          {showContinueGame && (
            <NavLink to="/home">
              <button className="start-button">
                <strong>Start new game!</strong>
              </button>
            </NavLink>
          )}
          {showScore && <Score />}
        </div>

        <div className="nav__right-block">
          {!isAuth && (
            <NavLink className="nav__item" to="/login">
              Login
            </NavLink>
          )}
          {!isAuth && (
            <NavLink className="nav__item" to="/signup">
              Signup
            </NavLink>
          )}
          {isAuth && (
            <NavLink className="nav__item" to="/profile">
              {name}
            </NavLink>
          )}
          {isAuth && (
            <NavLink
              className="nav__item"
              to="/"
              onClick={() => logoutHandler()}
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
