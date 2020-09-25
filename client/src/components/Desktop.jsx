import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { initializeNewGameAC } from '../store/actions'
import axios from 'axios'

const axiosQ = axios.create({ withCredentials: true })

export default function Desktop() {
  const dispatch = useDispatch()
  const { isAuth, initialized } = useSelector(state => state)

  async function fetchDataForStore() {
    const response = await axiosQ('http://localhost:3001/new')
    const newGame = response.data
    //  const isNew = response.headers.get('isNew')
    //  newGame.isNew = isNew
    dispatch(initializeNewGameAC(newGame))
  }

  useEffect(() => {
    if (!initialized && isAuth) fetchDataForStore()
  }, [initialized, isAuth])

  return (
    <div className="bg" ></div>
  )
}
