import React from 'react'
import classes from './Finished.module.css'


function CircleItem({circle}) {
    const circumference = 52 * 2 * Math.PI;
    const defaultOffset = `${circumference - circle.content.units /  circle.content.total * circumference}`;

    return (
        <div className={classes['circle-box']} key={circle.content.label}>
            <svg
                className={classes.circle}>
                <circle
                    className={classes.ring}
                    stroke={circle.mainColor}
                    strokeWidth="5"
                    fill="transparent"
                    r="52"
                    cx="50%"
                    cy="50%"
                />
                <circle
                    className={classes.ring}
                    style={{ strokeDashoffset: defaultOffset, strokeDasharray: `${circumference} ${circumference}` }}
                    stroke={circle.secondColor}
                    strokeWidth="5"
                    fill="transparent"
                    r="52"
                    cx="50%"
                    cy="50%"
                />
            </svg>
            <div className={classes['circle-info']}>
                <p className={`${classes.label} text text3`}>{circle.content.type}</p>
                <h3>
                    {circle.content.heart && <span className={`${classes.heart} _icon-heart`}></span>}
                    {circle.content.units || 0}</h3>
                <p className="text text2">{circle.content.label}</p>
            </div>
        </div>
    )
}

export default CircleItem