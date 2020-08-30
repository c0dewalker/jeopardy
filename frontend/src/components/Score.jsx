import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import emoji_smile from '../img/emoji_smile.png'
import emoji_sad from '../img/emoji_sad.png'

export default function Score() {
  const { score, lives } = useSelector(state => state)
  const [livesIcons, setLivesIcons] = useState([])

  useEffect(() => {
    const icons = []
    for (let i = 1; i <= lives; i++)
      icons.push(emoji_smile)
    for (let i = 3 - lives; i >= 1; i--)
      icons.push(emoji_sad)
    setLivesIcons(icons)
  }, [lives])

  return (
    <div className="score-block">
      <div> <span className="score-text">SCORE:</span> <span className="score-number"><b>{score}</b></span></div>
      <div className="lives">
        {livesIcons.map(live => <img height="40px" src={live} alt="live icon" />)}
      </div>
    </div>
  )
}
