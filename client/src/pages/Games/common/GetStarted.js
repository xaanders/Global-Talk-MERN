import React, { useState } from 'react'
import { Button, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux';

import classes from './GetStarted.module.css'
import RadioInput from './RadioInput';
import { shuffleArray } from '../../../utils/arrayMethods'

const levels = [
    {
        level: 'A1',
        classList: classes.green
    },
    {
        level: 'A2',
        classList: classes.yellow
    },
    {
        level: 'B1',
        classList: classes.orange
    },
    {
        level: 'B2',
        classList: classes.red
    },
    {
        level: 'C1',
        classList: classes.purple
    },
    {
        level: 'C2',
        classList: classes.blue
    },

]
function GetStarted({ img, title, badge, descr, handler, words }) {
    const [level, setLevel] = useState();
    const [error, setError] = useState(false);
    const dictionary = useSelector(state => state.user.userInfo.profile.dictionary) || [];
    
    const inputHandler = (newLevel) => {
        setLevel(newLevel)
        setError(false)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const gameWords = words.filter(item => item.level === level && dictionary.includes(item.translation));
        if (gameWords.length > 0) {
            handler({ type: "LEVEL", level: level, gameWords: shuffleArray(gameWords) })
        } else {
            setError('There are no words in your dictionary... Add some for further study')
        }

    }

    return (
        <div className={classes.getstarted}>
            <div className='d-flex align-items-center justify-content-center'>
                <div className={`${classes.message} d-flex flex-column flex-md-row justify-content-between align-items-center gap-4`}>
                    <Image className={`${classes.image} mx-auto`} src={img} />
                    <div className={`${classes.info}`}>
                        <div className="mb-3 mb-sm-5 d-flex d-md-block flex-column align-items-center justify-content-center">
                            <h3 className={`${classes['getstarted-title']} mb-3 d-flex gap-2`}>{title} <span className={`align-self-start ${classes.badge}`}>{badge}</span></h3>
                            <p className={`text text2 ${classes.text}`}>{descr}</p>
                        </div>
                        <form className={`${classes.actions}`} onSubmit={submitHandler} >
                            <label htmlFor='ul' className={`d-block text text3 mb-2`}>Choose a level:</label>
                            <ul className={`d-flex gap-4 mb-4 ps-0 flex-wrap flex-sm-nowrap justify-content-md-start justify-content-center  ${classes.list}`}>
                                {levels.map(item => (
                                    <RadioInput item={item} key={item.level} inputHandler={inputHandler} />
                                ))}
                            </ul>
                            <Button type="submit" className="button button-blue button-content button" name="get started">GET STARTED</Button>
                        </form>
                    </div>
                </div>
            </div>
            <div className={`${classes.error} text text2 d-flex justify-content-center`}>{error && error}</div>
        </div>

    )
}

export default GetStarted
