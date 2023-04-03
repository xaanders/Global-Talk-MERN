import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'

import { Container } from 'react-bootstrap'
import Finished from '../common/Finished/Finished'
import GetStarted from '../common/GetStarted'
import AudioGame from './components/AudioGame'
import CustomSpinner from '../../../common/CustomSpinner'

const initialState = { gameWords: [], answers: [], hearts: 5, points: 0 }
const gameReducer = (state, action) => {
    if (action.type === 'LEVEL') {
        const gameOptions = {
            ...state,
            level: action.level,
            gameWords: action.gameWords,
            currentWordIndex: 0
        }
        return gameOptions;
    }

    if (action.type === 'PLAYER') {
        const newAnswer = { word: action.word, answer: action.answer, audio: true }
        const newState = {
            ...state,
            answers: [...state.answers, newAnswer],
            currentWordIndex: state.currentWordIndex + 1,
            hearts: newAnswer.answer ? state.hearts : state.hearts - 1,
            points: newAnswer.answer ? state.points + 2 : state.points
        }

        return newState
    }

    if (action.type === 'RESET') {
        return initialState;
    }
}

function AudioCall() {
    const [words, setWords] = useState([]);
    const [state, dispatch] = useReducer(gameReducer, initialState);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/router/words/`)
            .then(response => {
                setWords(response.data);
            })
            .catch(err => console.log(err));
    }, [setWords]);

    let gamePage = <GetStarted
        img='assets/images/games/audio.jpg'
        descr="The Audio-Call training develops vocabulary and improves listening comprehension."
        title="Audio-Call"
        badge="audition task"
        words={words}
        handler={dispatch}
    />;

    // started game
    if (state.level && state.gameWords[state.currentWordIndex]) {
        gamePage = <AudioGame
            current={state.gameWords[state.currentWordIndex]}
            words={state.gameWords}
            allWords={words}
            hearts={state.hearts}
            handler={dispatch}
        />
    }

    if (words.length <= 0) {
        gamePage = <CustomSpinner/>;
    }


    if ((state.answers.length && state.answers.length === state.gameWords.length) || state.hearts === 0) {
        gamePage = <Finished
            title='Your Audio-Call'
            message={state.stars === 0 ? "You did okay! But I think you need to listen all the words one more time" : "Good job! You're doing great!"}
            hearts={state.hearts}
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

export default AudioCall