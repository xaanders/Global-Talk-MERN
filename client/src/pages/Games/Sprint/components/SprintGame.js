import React, { useEffect, useState } from 'react'

import { Button } from 'react-bootstrap';
import Rings from './Rings';
import classes from './SprintGame.module.css'

function SprintGame({ current, words, points, handler, timer, stars }) {
    const [currentTranslation, setCurrentTranslation] = useState();
    const life = [0, 0, 0];
    const currentStars = life.fill(1, 0, stars);

    const answerHandler = (e) => {
        const answer = current.translation === currentTranslation;
        const targetBtn = e.target.innerHTML;

        if (targetBtn === "Right" && answer) {
            handler({ type: "PLAYER", word: current, answer: true })
        }
        if (targetBtn === "Wrong" && !answer) {
            handler({ type: "PLAYER", word: current, answer: true })
        }

        if (targetBtn === "Wrong" && answer) {
            handler({ type: "PLAYER", word: current, answer: false })
        }

        if (targetBtn === "Right" && !answer) {
            handler({ type: "PLAYER", word: current, answer: false })
        }
    }
    // auto answer

    useEffect(() => {
        if (timer === 0) {
            const randomTranslation = Math.floor(Math.random() * words.length);
            setCurrentTranslation(words[randomTranslation].translation)
        }

        if (timer >= 5) {
            handler({
                type: "AUTO",
                word: current,
            })
        }
    }, [timer, current, setCurrentTranslation, words, handler])



    return (
        <div className={`${classes.game} d-flex flex-column gap-5 justify-content-center`}>
            <div className={classes.words}>
                <div className={`mx-auto ${classes.circle}`} style={{ color: "#04fc43" }}>
                    <Rings counter={timer} setCounter={handler} />

                    <div className={`d-flex gap-3 gap-sm-5 flex-column ${classes.content}`}>
                        <div className={`${classes.points} d-flex flex-column align-items-center justify-content-center`}>
                            <div>{points}</div>
                            <span className="text text2 my-auto">points</span>
                        </div>

                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <div className={classes.indicators}>
                                {currentStars.map((item, i) => (
                                    <span className={`_icon-square ${item === 0 ? '' : classes.active}`}></span>
                                ))}
                            </div>

                            <h2 className={classes.word}>{current.word}</h2>
                            <h2 className={classes.translation}>{currentTranslation}</h2>

                        </div>

                        <div className={`${classes.activities} d-flex justify-content-center gap-3`}>
                            <Button className={`button button-light-blue ${classes.answers}`} variant="link" onClick={answerHandler}>Right</Button>
                            <Button className={`button button-rose ${classes.answers}`} variant="link" onClick={answerHandler}>Wrong</Button>
                        </div>
                    </div>
                </div>

            </div>

            <div className={`mx-auto ${classes.message}`}>
                <p className="text text3">*You can also use the keys ← → on the keyboard</p>
            </div>
        </div>
    )
}

export default SprintGame
