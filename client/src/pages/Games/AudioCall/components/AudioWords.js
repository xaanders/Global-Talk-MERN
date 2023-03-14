import React from 'react'
import classes from './AudioGame.module.css'

function AudioWords({answered, randomWords, handler, current, right}) {
  return (
    <ul className={`${classes.words} d-flex gap-3 p-0 flex-wrap justify-content-center`}>
        {randomWords.map(item => (
          <button
            className={`
            ${classes.word} 
            ${answered && item.translation === current.translation ? classes.rightAnswer : ''}
            ${answered && item.translation === answered && !right ? classes.wrongAnswer : ''}
            `}
            key={item.translation}
            onClick={() => !answered && handler(item.translation)}>{item.translation}</button>
        ))}
      </ul>

  )
}

export default AudioWords