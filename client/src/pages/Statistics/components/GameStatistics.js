import React from 'react'
import { Image } from 'react-bootstrap'
import classes from './UserStatistics.module.css'

function GameStatistics({ options, location }) {
    return (
        <React.Fragment>

            <div>
                <div className='d-flex align-items-center flex-column flex-sm-row flex-xl-column justify-content-around'>
                    {options.map(item => (
                        <div className="d-flex" key={item.title}>
                            <div className={classes.img}>
                                <Image fluid src={item.image} alt={options.badge} />
                            </div>
                            <div>
                                <div className="d-flex gap-2">
                                    <h4>{item.title}</h4>
                                    <span className={classes.badge}>{item.badge}</span>
                                </div>
                                <div className={classes.stats}>
                                    <div className="">
                                        <p className="text text2 m-0"><span className={classes.counter}>{item.words}</span> words studied</p>
                                        <p className="text text2 m-0"><span className={classes.counter}>{item.correct}%</span> correct answers</p>
                                        <p className="text text2 m-0"><span className={classes.counter}>{item.games}</span> games {location === 'day' && 'today'} played </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </React.Fragment>

    )
}

export default GameStatistics