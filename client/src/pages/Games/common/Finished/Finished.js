import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUserProfile } from '../../../../store/actions/userActions';
import { userActions } from '../../../../store/reducers/user-slice';
import todayDate from '../../../../utils/date';

import classes from './Finished.module.css'
import GameStats from './GameStats';
import GameWords from './GameWords';

function Finished({ title, answers, message, handler, points, hearts }) {
    const profile = useSelector(state => state.user.userInfo.profile);
    const id = useSelector(state => state.user.userInfo && state.user.userInfo.profile._id);
    const dispatch = useDispatch();
    const [days] = useState({ ...profile.dayStatistics });
    console.log(profile);
    useEffect(() => {
        if (id) {

            const newAnswers = answers.map(item => {
                return {
                    word: item.word.translation,
                    answer: item.answer
                }
            })

            // current game date and total answers information
            const gameStatistics = {
                date: todayDate,
                answers: newAnswers
            }
            // day statistics
            let newDays;

            if (answers[0].audio) {
                newDays = { Sprint: days.Sprint, AudioCall: [...days.AudioCall, gameStatistics] }
            }
            if (answers[0].sprint) {
                newDays = { AudioCall: days.AudioCall, Sprint: [...days.Sprint, gameStatistics] }
            }
            // sending edited dictionary and statistics to the DB and setting redux store
            const newProfile = {
                profileId: id,
                dayStatistics: newDays
            }
            setUserProfile(newProfile, dispatch);
        }

    }, [dispatch, answers, id, days]);

    return (
        <div className={`d-flex gap-2 justify-content-center align-items-center ${classes['total-box']}  flex-column flex-lg-row`}>
            <GameStats
                message={message}
                answers={answers}
                title={title}
                replay={handler}
                points={points}
                hearts={hearts} />
            <GameWords answers={answers} />
        </div>
    )
}

export default Finished