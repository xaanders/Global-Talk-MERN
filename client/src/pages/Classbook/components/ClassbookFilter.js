import React from 'react'
import { Container } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'

import classes from './ClassbookFilter.module.css'
const filters = [
    {
        level: 'A1',
        type: 'Easy',
        className: classes.easy
    },
    {
        level: 'A2',
        type: 'Easy',
        className: classes.easy
    },
    {
        level: 'B1',
        type: 'Medium',
        className: classes.medium
    },
    {
        level: 'B2',
        type: 'Medium',
        className: classes.medium
    },
    {
        level: 'C1',
        type: 'Hard',
        className: classes.hard
    },
    {
        level: 'C2',
        type: 'Hard',
        className: classes.hard
    },
]
function ClassbookFilter() {
    const params = useParams();
    const currenLevel = !params.level ? 'a1' : params.level;
    return (
        <section>
            <Container>
                <div className={`d-flex flex-wrap justify-content-between align-items-center mx-auto ${classes.filter}`}>
                    {filters.map(item => {
                        return <Link
                            to={`${item.level.toLowerCase()}`}
                            key={item.level}
                            className={`${classes.links} ${item.className} ${currenLevel === item.level.toLowerCase() ? classes.active : ''}`}>
                            <h4>{item.level}</h4>
                            <span>{item.type}</span>
                        </Link>
                    }
                    )}
                </div>
            </Container>
        </section>
    )
}

export default ClassbookFilter

// ({ isActive }) =>
//                                 isActive ? `${classes.links} ${item.className} ${classes.active}` : `${classes.links} ${item.className}`
//                                 }