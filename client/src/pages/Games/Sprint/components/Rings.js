import React, { useEffect } from 'react'
import classes from './SprintGame.module.css'

function Rings({counter, setCounter}) {
    
    const circumference = 242 * 2 * Math.PI;
    const defaultOffset = `${circumference - counter / 4 * circumference}`;
    let CxCy = 500 / 2;
    if(window.innerWidth < 575) {
        CxCy = 300 / 2
    }
    if(window.innerWidth < 380) {
        CxCy = 200 / 2
    }
    useEffect(() => {
        let interval;
        if (counter < 5) {
            interval = setInterval(() => {
                setCounter({type: "TIMER"})
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [counter, setCounter]);

    return (
        <svg
            className={classes.timing}
        >
            <circle
                className={classes.ring}
                stroke="#C3DCE3"
                strokeWidth="8"
                fill="transparent"
                r={`${CxCy - 8}`}
                cx={CxCy + ''}
                cy={CxCy + ''}
            />
            <circle
                className={`${classes.ring} ${counter === 0 ? classes.active : ''}`}
                style={{ strokeDashoffset: defaultOffset, strokeDasharray: `${circumference} ${circumference}` }}
                stroke="#2B788B"
                strokeWidth="8"
                fill="transparent"
                r={`${CxCy - 8}`}
                cx={CxCy + ''}
                cy={CxCy + ''}
            />
        </svg>
    )
}

export default Rings