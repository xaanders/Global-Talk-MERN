import React from 'react'
import classes from './GetStarted.module.css'

function RadioInput({item, inputHandler}) {
    return (
        <li className={classes['list-item']}>
            <input type="radio" value={item.level} name="levelsGroup" className={classes['radio-item']} onChange={() => inputHandler(item.level)}/>
            <span className={`${classes.checkmark} ${item.classList}`}>{item.level}</span>
        </li>
    )
}

export default RadioInput