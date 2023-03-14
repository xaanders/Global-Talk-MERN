import React from 'react'
import { Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Circles from './Circles';
import classes from './Finished.module.css'
function GameStats({ message, title, answers, points, replay, hearts}) {
    const rightAnswers = answers.filter(item => item.answer);
    const circles = [
        {
            mainColor: '#C3DCE3',
            secondColor: '#2B788B',
            content: {
                label: 'points',
                type: "retrieved",
                units: points,
                total: answers.length * 2
            }
        },
        {
            mainColor: hearts !== undefined ? '#F2D4DC' : 'rgba(99, 155, 109, 0.3)',
            secondColor: hearts !== undefined ? '#945069' : '#639B6D',
            content: hearts !== undefined ? {
                label: 'lives',
                units: hearts,
                type: "remains",
                total: 5,
                heart: true
            } : {
                label: 'words',
                type: answers.length + '/',
                units: rightAnswers.length,
                total: answers.length
            }
        }]

    return (
        <div className={`${classes.total}`}>
            <div>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-none d-sm-block">
                        <Image src="/assets/images/games/gameisfinished.jpg" fluid />
                    </div>
                    <div className={classes.content}>
                        <div className="d-flex flex-column gap-2">
                            <h3 className={classes['main-title']}>{title}</h3>
                            <p className="text text2 m-0">{message}</p>
                        </div>
                        <Circles circles={circles}/>
                    </div>
                </div>
                <div className={`${classes.actions} d-flex flex-column flex-sm-row justify-content-center align-items-center gap-4`}>
                    <Button className={`button ${classes.replay}`} onClick={() => replay({ type: "RESET" })}><span className="_icon-replay me-1"></span>Play it again</Button>
                    <Link className="button button-light-blue link-button" to="/textbook">Go to textbook</Link>
                </div>

            </div>
        </div>
    )
}

export default GameStats