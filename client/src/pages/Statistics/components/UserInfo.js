import React, { useEffect, useState } from 'react'
import GameStatistics from './GameStatistics'
import classes from './UserStatistics.module.css'
import todayDate from '../../../utils/date';

function correctAnswers(arr) {
    return arr.map(item => {
        return item.answers.map(elem => elem.answer ? 1 : 0).reduce((a, b) => a + b, 0)
    }).reduce((a, b) => a + b, 0)
}

function totalAnswers(arr) {
    return arr.map(item => {
        return item.answers.map(elem => 1).reduce((a, b) => a + b, 0)
    }).reduce((a, b) => a + b, 0)
}

function wordsLearned(arr) {
    const result = [];
    arr.map(item => {
        return item.answers.filter(elem => elem.answer)
    })
        .filter(item => item.length > 0)
        .map(item => item.map(elem => elem.word))
        .forEach(item => {
            item.forEach(elem => !result.includes(elem) && result.push(elem))
        });

    return result;
}



const initialState = {
    games: { sprint: 0, audio: 0 },
    answersGames: {
        sprintCorrect: [],
        audioCorrect: [],
        sprintTotalAnswers: [],
        audioTotalAnswers: []
    },
    wordsStudied: { sprint: [], audio: [] },
    totalAnswers: 0,
    totalCorrect: 0,
    totalWords: 0
}

function UserInfo({ loc, dayStats }) {
    const [statistics, setStatistics] = useState(initialState);

    useEffect(() => {
        let games;

        if (loc === 'day') {
            games = {
                sprint: dayStats.Sprint.filter(item => item.date === todayDate),
                audio: dayStats.AudioCall.filter(item => item.date === todayDate)
            };
        } else {
            games = { sprint: dayStats.Sprint, audio: dayStats.AudioCall };
        }

        const answersGames = {
            sprintCorrect: correctAnswers(games.sprint),
            audioCorrect: correctAnswers(games.audio),
            sprintTotalAnswers: totalAnswers(games.sprint),
            audioTotalAnswers: totalAnswers(games.audio)
        }

        const totalAllAnswers = answersGames.sprintTotalAnswers + answersGames.audioTotalAnswers;
        const totalCorrect = answersGames.sprintCorrect + answersGames.audioCorrect;
        const wordsStudied = {
            sprint: wordsLearned(games.sprint),
            audio: wordsLearned(games.audio)
        }
        const totalWords = [];
        wordsStudied.sprint.forEach(item => !totalWords.includes(item) && totalWords.push(item));
        wordsStudied.audio.forEach(item => !totalWords.includes(item) && totalWords.push(item));

        setStatistics({
            games,
            answersGames,
            wordsStudied,
            totalAllAnswers,
            totalCorrect,
            totalWords
        });
    }, [setStatistics, loc, dayStats]);

    const sprint = {
        title: 'Sprint',
        words: statistics.wordsStudied.sprint.length,
        correct: statistics.answersGames.sprintTotalAnswers ? (statistics.answersGames.sprintCorrect / statistics.answersGames.sprintTotalAnswers * 100).toFixed(0) : 0,
        games: statistics.games.sprint.length,
        badge: 'speed task',
        image: '/assets/images/games/sprint.jpg'
    }
    const audio = {
        title: 'Audio',
        words: statistics.wordsStudied.audio.length,
        correct: statistics.answersGames.audioTotalAnswers ? (statistics.answersGames.audioCorrect / statistics.answersGames.audioTotalAnswers * 100).toFixed(0) : 0,
        games: statistics.games.audio.length,
        badge: 'audition task',
        image: '/assets/images/games/audio.jpg'
    }

    return (
        <div className={classes.info}>
            <div className="d-flex flex-column gap-2 align-items-center align-items-lg-start justify-content-start mb-4">
                {loc === 'day' ? <h3>Today's statistics</h3> : <h3>All time statistics</h3>}
                <p className="text text2 m-0">Your statistics on all activities</p>
            </div>
            <div className="d-flex justify-content-around mb-4">
                <div className={`${classes.total} text-center`}>
                    <div className={classes.units}>{statistics.totalWords.length}<span>+</span></div>
                    <p className="text text2 m-0">words studied</p>
                </div>
                <div className={`${classes.total} text-center`}>
                    <div className={classes.units}>{statistics.totalAllAnswers ? (statistics.totalCorrect / statistics.totalAllAnswers * 100).toFixed(0) : 0}<span>%</span></div>
                    <p className="text text2 m-0">correct answers</p>
                </div>
            </div>

            <div>
                <GameStatistics
                    location={loc}
                    totalSprint={statistics.wordsStudied.sprint.length}
                    totalAudio={statistics.wordsStudied.audio.length}
                    options={[sprint, audio]} />
            </div>
        </div>
    )

}

export default UserInfo

