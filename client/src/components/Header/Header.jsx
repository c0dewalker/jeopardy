import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { continueGameAC, gamePausedAC, logoutAC } from '../../store/game'
import { useHistory } from 'react-router-dom'
import Score from './Score/Score'
import axios from 'axios'
import 'antd/dist/antd.css'

const axiosCors = axios.create({ withCredentials: true })

export default function Header() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { gameStatus, isAuth, name } = useSelector((state) => state)
  const fullState = useSelector((state) => state)
  // const isNew = true

  const showStartNew = isAuth && gameStatus === 'notReady'
  const showContinueGame = isAuth && gameStatus === 'paused'
  const showScore = isAuth && gameStatus === 'started'

  const logoutHandler = async () => {
    if (gameStatus === 'started' || gameStatus === 'paused') {
      const responseSave = await axiosCors.post(
        'http://localhost:3001/save',
        fullState
      )
    }
    const responseLogout = await axiosCors.get('http://localhost:3001/logout')
    dispatch(logoutAC())
    history.push('/')
  }

  const continueGameHandler = () => dispatch(continueGameAC())

  const logoClickHandler = () => {
    if (gameStatus === 'started') {
      dispatch(gamePausedAC())
    }
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="container">
          <div className="nav__left-block">
            <NavLink to="/">
              <img
                onClick={logoClickHandler}
                className="nav__logo"
                src="https://freepikpsd.com/wp-content/uploads/2019/10/jeopardy-logo-png-3-Transparent-Images.png"
                alt="Jeopardy Logo"
              />
            </NavLink>
          </div>

          <div className="nav__center-block">
            {showStartNew && (
              <NavLink to="/game">
                <button className="start-button">
                  <strong>Start new game!</strong>
                </button>
              </NavLink>
            )}
            {showContinueGame && (
              <NavLink to="/game">
                <button onClick={continueGameHandler} className="start-button">
                  <strong>Continue game!</strong>
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
              <NavLink className="nav__item" onClick={logoutHandler} to="#">
                Logout
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
