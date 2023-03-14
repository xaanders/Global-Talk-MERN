import React from 'react'
import CircleItem from './CircleItem'
import classes from './Finished.module.css'

function Circles({ circles }) {

    return (
        <div className={`d-flex ${classes.circles}`}>
            {circles.map(circle => (
                <CircleItem circle={circle} key={circle.content.label}/>
            ))}
        </div>
    )
}

export default Circles