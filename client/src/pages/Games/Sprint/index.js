import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

import { Container, Spinner } from 'react-bootstrap'
import Finished from '../common/Finished/Finished'
import GetStarted from '../common/GetStarted'
import SprintGame from './components/SprintGame'
const initialState = {gameWords: [], answers: []}

const gameReducer = (state, action) => {
  if (action.type === 'LEVEL') {
      const gameOptions = {
        level: action.level,
        answers: [],
        currentWordIndex: 0,
        gameWords: action.gameWords,
        timer: 0,
        points: 0,
        stars: 3
      }
      return gameOptions;
  }

  if (action.type === 'AUTO') {
    const newAnswer = { word: action.word, answer: false, sprint: true}
    const newState = {
      ...state,
      answers: [...state.answers, newAnswer],
      currentWordIndex: state.currentWordIndex + 1,
      timer: 0,
      stars: newAnswer.answer ? state.stars : state.stars - 1,

    }
    return newState
  }

  if (action.type === 'PLAYER') {
    const newAnswer = { word: action.word, answer: action.answer, sprint: true}
    const newState = {
      ...state,
      answers: [...state.answers, newAnswer],
      currentWordIndex: state.currentWordIndex + 1,
      timer: 0,
      stars: newAnswer.answer ? state.stars : state.stars - 1,
      points: newAnswer.answer ? state.points + 2 : state.points
    }

    return newState
  }
  if (action.type === 'TIMER') {
    const newState = {
      ...state,
      timer: state.timer + 1
    }
    return newState
  }

  if (action.type === 'RESET') {
    return initialState;
  }
}

function Sprint() {
  const [words, setWords] = useState([]);
  const [state, dispatch] = useReducer(gameReducer, initialState);
  // getting all words
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/router/words/`)
      .then(response => {
        setWords(response.data);
      })
      .catch(err => console.log(err));
  }, [setWords]);
  
  // default page
  let gamePage = <GetStarted
    img='assets/images/games/sprint.jpg'
    descr="Trains the skill of fast translation. You have to choose if the translation corresponds to the suggested word."
    title="Sprint"
    badge="speed task"
    words={words}
    handler={dispatch} 
    />;

  // started game
  if (state.level && state.gameWords[state.currentWordIndex]) {
    gamePage = <SprintGame
      current={state.gameWords[state.currentWordIndex]}
      words={state.gameWords}
      points={state.points}
      timer={state.timer}
      handler={dispatch} 
      stars={state.stars}
      />
  }

  if (words.length <= 0) {
    gamePage = <div className='w-100 d-flex align-items-center justify-content-center pt-5'>
      <Spinner animation="border" className="spinner" role="status" style={{ width: '100px', height: '100px' }} />
    </div>;
  }
 
  if ((state.answers.length && state.answers.length === state.gameWords.length) || state.stars === 0) {
    gamePage = <Finished
      title='Your Sprint'
      message={state.stars === 0 ? "You did okay but I think you need to read all the words one more time" : 'You did pretty good!'}
      answers={state.answers}
      points={state.points}
      handler={dispatch}
    />
  }
  return (
    <section>
      <Container>
        {gamePage}
      </Container>
    </section>
  )
}

export default Sprint