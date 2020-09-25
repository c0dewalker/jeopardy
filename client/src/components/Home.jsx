import React, { useEffect } from "react"
import { setIsPlayingTrueAC } from '../store/actions'
import Game from './Game'

import { useSelector, useDispatch } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsPlayingTrueAC())
  }, [])

  const { isAuth, initialized } = useSelector(state => state)

  return (
    <>
      {(initialized && isAuth) && <Game />}
      {(!initialized && isAuth) && <h1>Loading</h1>}
    </>
  )
}

export default Home
