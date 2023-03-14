import React, { useEffect, useRef, useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import AudioItem from '../../common/Finished/AudioItem';
import classes from './AudioGame.module.css'
import {shuffleArray} from '../../../../utils/arrayMethods'
import AudioWords from './AudioWords';

function AudioGame({ hearts, words, current, handler, allWords }) {
  const audioRef = useRef(null);
  const life = [0, 0, 0, 0, 0];
  const currentHearts = life.fill(1, 0, hearts);
  const [randomWords, setRandomState] = useState([]);
  const [answered, setAnswered] = useState(false);
  const right = answered === current.translation;

  useEffect(() => {
    setTimeout(() => audioRef.current.play(), 500);
    const newWords = [current];
    while (newWords.length < 6) {
      const randomElement = allWords[Math.floor(Math.random() * allWords.length)];
      if (!newWords.includes(randomElement)) {
        newWords.push(randomElement)
      }
    }
    setRandomState(shuffleArray(newWords));

  }, [current, setRandomState, allWords])

  const audioPlay = () => {
    audioRef.current.play(current.audio);
  }

  const answerHandler = (answer) => {
    setAnswered(answer);
  }

  const next = () => {
    setAnswered(false)
    handler({ type: "PLAYER", word: current, answer: right })
  }

  return (
    <div className={`${classes.game} d-flex flex-column gap-4 justify-content-center align-items-center`}>
      <div className="d-flex flex-column  justify-content-center align-items-center gap-3">
        <div className={classes.answer} >
          <div className={`${classes.answered} ${answered ? classes.active : ''}`}>
            <Image src={current.image} fluid alt={current.translation} />
            <div className={`d-flex gap-2 align-items-center ${classes['answered-word']}`} key={current.word}>
              <div>
                <AudioItem audio={current.audio} />
              </div>
              <span className={`${classes['main-word']} text text1`}>{current.translation} </span>
              <span className={`${classes['translation']} text text1`}>- {current.word}</span>
            </div>
          </div>
          <button className={`${classes['audio-play']} ${answered ? classes.active : ''}`} onClick={audioPlay}>
            <span className={`_icon-audio ${classes.icon}`}></span>
            <span className={`${classes.label} text text1`}>Play</span>
            <audio src={current.audio} ref={audioRef} />
          </button>
        </div>

        <ul className={`${classes.hearts} d-flex p-0 gap-2`}>
          {currentHearts.map((item, i) => (
            <li className={`_icon-heart ${item === 0 ? '' : classes.active}`} key={i}></li>
          ))}
        </ul>
      </div>
      
      <AudioWords handler={answerHandler} randomWords={randomWords} answered={answered} current={current} right={right}/>

      <div>
        {answered ?
          <Button className={`button button-light-blue ${classes.idk}`} onClick={next}>Next</Button>
          : <Button className={`button button-light-blue ${classes.idk}`} onClick={() => answerHandler("I don't know")}>I don't know</Button>
        }
      </div>

      <p className="text text3 pt-5">*You can also use <span className={classes.keys}>1-5</span> keys on the keyboard</p>
    </div>

  )
}

export default AudioGame